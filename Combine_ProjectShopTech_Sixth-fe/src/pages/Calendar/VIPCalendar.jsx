import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./taro.css";
import { useNavigate } from "react-router-dom";
import { fetchAppointments } from "../../apis/appointmentApi";

function VIPCalendar() {
  const navigate = useNavigate();

  // Dark mode from localStorage (sync with AdminLayout)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('adminDarkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [events, setEvents] = useState([]);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentMonthLabel, setCurrentMonthLabel] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // ⭐ PINNED EVENTS (persist via localStorage)
  const [pinnedEvents, setPinnedEvents] = useState([]);

  // Load pinned on mount
  useEffect(() => {
    const saved = localStorage.getItem("pinnedEvents");
    if (saved) setPinnedEvents(JSON.parse(saved));
  }, []);

  // Save pinned to localStorage
  const savePinned = newList => {
    setPinnedEvents(newList);
    localStorage.setItem("pinnedEvents", JSON.stringify(newList));
  };

  // Week days + time slots
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const timeSlots = Array.from({ length: 8 }, (_, i) => 8 + i * 2); // 8h → 22h

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Fetch API
  const loadAppointments = async () => {
    try {
      const appointments = await fetchAppointments();

      const mappedEvents = appointments.map(a => {
        const start = new Date(a.expectedArrival);
        const end = new Date(start.getTime() + (a.duration || 60) * 60000);

        const pad = n => String(n).padStart(2, "0");
        const startTime = `${pad(start.getHours())}:${pad(start.getMinutes())}`;
        const endTime = `${pad(end.getHours())}:${pad(end.getMinutes())}`;

        return {
          id: a.id,
          title: a.notes || "Appointment",
          date: start,
          day: start.getDay(),
          startTime,
          endTime,
          guestEmail: a.guestEmail || "",
          guestName: a.guestName || "",
          guestPhone: a.guestPhone || "",
          notes: a.notes || "",
        };
      });

      setEvents(mappedEvents);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // Update week view
  useEffect(() => {
    const startOfWeek = new Date(currentWeekStart);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const newWeekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });

    setWeekDates(newWeekDates);
    setCurrentMonthLabel(
      `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`
    );
  }, [currentWeekStart]);

  const getEventsForWeek = () => {
    const startOfWeek = new Date(currentWeekStart);
    startOfWeek.setDate(currentWeekStart.getDate() - currentWeekStart.getDay());

    const end = new Date(startOfWeek);
    end.setDate(end.getDate() + 6);

    return events.filter(ev => ev.date >= startOfWeek && ev.date <= end);
  };

  const goToDate = date => {
    const d = new Date(date);

    // ⭐ cập nhật Week View
    setCurrentWeekStart(d);

    // ⭐ cập nhật Mini Calendar
    setSelectedMonth(d.getMonth());
    setSelectedYear(d.getFullYear());
  };

  // ⭐ Toggle pin / unpin
  const togglePin = event => {
    const exists = pinnedEvents.find(e => e.id === event.id);

    if (exists) {
      const filtered = pinnedEvents.filter(e => e.id !== event.id);
      savePinned(filtered);
    } else {
      const added = [...pinnedEvents, event];
      savePinned(added);
    }
    setSelectedEvent(null);
  };

  const isPinned = eventId => {
    return !!pinnedEvents.find(e => e.id === eventId);
  };

  const isToday = date => {
    const now = new Date();
    return (
      now.getDate() === date.getDate() &&
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear()
    );
  };

  const formatDate = value => {
    const d = new Date(value);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const eventsThisWeek = getEventsForWeek();

  // style event on calendar
  const calculateEventStyle = (startTime, endTime) => {
    const [sh, sm] = startTime.split(":").map(Number);
    const [eh, em] = endTime.split(":").map(Number);

    const start = sh + sm / 60;
    const end = eh + em / 60;

    const base = 8;
    const cell = 50; // height per hour

    const top = (start - base) * cell;
    const height = Math.max((end - start) * cell, 30);

    return {
      top,
      height,
      left: "4px",
      right: "4px",
      position: "absolute",
      zIndex: 5,
    };
  };

  // Theme colors
  const bgMain = darkMode ? "bg-slate-950" : "bg-gray-50";
  const bgCard = darkMode ? "bg-slate-900/60" : "bg-white";
  const bgSecondary = darkMode ? "bg-slate-800" : "bg-gray-100";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-slate-400" : "text-gray-600";
  const textTertiary = darkMode ? "text-slate-300" : "text-gray-700";
  const borderColor = darkMode ? "border-slate-800" : "border-gray-200";
  const hoverBg = darkMode ? "hover:bg-slate-800" : "hover:bg-gray-100";
  const hoverBgSecondary = darkMode ? "hover:bg-slate-700" : "hover:bg-gray-200";

  return (
    <div className={`min-h-screen w-full ${bgMain} ${textPrimary} flex flex-col`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-6 py-4 border-b ${borderColor}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/admin")}
            className={`px-3 py-2 rounded ${bgSecondary} ${hoverBgSecondary} text-sm`}
          >
            ← Back
          </button>
          <h1 className="text-xl font-semibold">Appointments</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentWeekStart(new Date())}
            className={`px-3 py-2 ${bgSecondary} rounded ${hoverBgSecondary} text-sm`}
          >
            Today
          </button>

          <div className={`flex border ${borderColor} rounded overflow-hidden`}>
            <button
              onClick={() =>
                setCurrentWeekStart(
                  new Date(
                    currentWeekStart.setDate(currentWeekStart.getDate() - 7)
                  )
                )
              }
              className={`px-2 ${hoverBg}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() =>
                setCurrentWeekStart(
                  new Date(
                    currentWeekStart.setDate(currentWeekStart.getDate() + 7)
                  )
                )
              }
              className={`px-2 ${hoverBg}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={loadAppointments}
            className="px-3 py-2 bg-emerald-500 hover:bg-emerald-600 rounded text-sm"
          >
            Reload
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-72 border-r ${borderColor} p-4 ${bgCard} flex flex-col gap-6`}>
          {/* Mini Calendar */}
          <section>
            {/* Month + Year Selector */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                {/* Month Select */}
                <select
                  className={`${bgSecondary} ${textPrimary} text-sm px-2 py-1 rounded`}
                  value={selectedMonth}
                  onChange={e => {
                    const m = Number(e.target.value);
                    setSelectedMonth(m);
                    const newDate = new Date(selectedYear, m, 1);
                    setCurrentWeekStart(newDate);
                  }}
                >
                  {monthNames.map((m, idx) => (
                    <option key={idx} value={idx}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* Year Select */}
                <select
                  className={`${bgSecondary} ${textPrimary} text-sm px-2 py-1 rounded`}
                  value={selectedYear}
                  onChange={e => {
                    const y = Number(e.target.value);
                    setSelectedYear(y);
                    const newDate = new Date(y, selectedMonth, 1);
                    setCurrentWeekStart(newDate);
                  }}
                >
                  {Array.from(
                    { length: 20 },
                    (_, i) => selectedYear - 10 + i
                  ).map(y => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Weekday Labels */}
            <div className={`grid grid-cols-7 text-center text-xs ${textSecondary} mb-1`}>
              {["S", "M", "T", "W", "T", "F", "S"].map((d, idx) => (
                <div key={idx}>{d}</div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 text-xs">
              {(() => {
                const firstDay = new Date(
                  selectedYear,
                  selectedMonth,
                  1
                ).getDay();
                const totalDays = new Date(
                  selectedYear,
                  selectedMonth + 1,
                  0
                ).getDate();
                const cells = [];

                for (let i = 0; i < firstDay; i++) cells.push(null);
                for (let d = 1; d <= totalDays; d++) cells.push(d);

                return cells.map((day, index) => {
                  if (!day) return <div key={index} className="h-7"></div>;

                  const cellDate = new Date(selectedYear, selectedMonth, day);
                  const today = isToday(cellDate);

                  return (
                    <button
                      key={index}
                      className={`h-7 w-7 rounded-full flex items-center justify-center 
              ${
                today
                  ? "bg-blue-500 text-white"
                  : `${hoverBg} ${textPrimary}`
              }
            `}
                      onClick={() => setCurrentWeekStart(cellDate)}
                    >
                      {day}
                    </button>
                  );
                });
              })()}
            </div>
          </section>

          {/* Pinned events */}
          <section className="flex-1 overflow-auto">
            <h2 className="text-sm font-semibold mb-2">Pinned</h2>
            {pinnedEvents.length === 0 && (
              <p className={`text-xs ${textSecondary}`}>No pinned items.</p>
            )}

            <div className="space-y-2">
              {pinnedEvents.map(ev => (
                <div
                  key={ev.id}
                  className={`p-2 rounded ${bgSecondary} cursor-pointer ${hoverBgSecondary}`}
                  onClick={() => goToDate(ev.date)}
                >
                  <div className="font-semibold text-sm truncate">
                    {ev.title}
                  </div>
                  <div className={`${textTertiary} text-xs`}>
                    {ev.startTime} - {ev.endTime}
                  </div>
                  <div className={`${textTertiary} text-xs`}>
                    {formatDate(ev.date)}
                  </div>
                  <div className={`${textSecondary} text-xs truncate`}>
                    {ev.guestName}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Calendar */}
        <section className="flex-1 p-4 overflow-auto">
          {/* Week headers */}
          <div className={`grid grid-cols-8 border-b ${borderColor}`}>
            <div className="h-10" />
            {weekDates.map((date, idx) => (
              <div
                key={idx}
                className={`h-10 flex flex-col items-center justify-center border-l ${borderColor}`}
              >
                <span className={`text-xs ${textSecondary}`}>{weekDays[idx]}</span>
                <span
                  className={`mt-1 px-2 py-1 rounded-full text-sm ${
                    isToday(date)
                      ? "bg-blue-500 text-white"
                      : `${bgSecondary} ${textPrimary}`
                  }`}
                >
                  {date.getDate()}
                </span>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-8 relative">
            {/* Time column */}
            <div>
              {timeSlots.map((hour, i) => (
                <div
                  key={i}
                  className={`h-20 border-b ${borderColor} text-right pr-2 text-xs ${textSecondary} pt-1`}
                >
                  {hour}:00
                </div>
              ))}
            </div>

            {/* Days */}
            {weekDates.map((date, dayIdx) => (
              <div
                key={dayIdx}
                className={`relative border-l ${borderColor}`}
                style={{ minHeight: timeSlots.length * 80 }}
              >
                {timeSlots.map((_, i) => (
                  <div key={i} className={`h-20 border-b ${darkMode ? 'border-slate-900/70' : 'border-gray-100'}`} />
                ))}

                {/* Events */}
                {eventsThisWeek
                  .filter(ev => ev.day === date.getDay())
                  .map(ev => {
                    const style = calculateEventStyle(ev.startTime, ev.endTime);

                    const pinned = isPinned(ev.id);

                    const tooltip =
                      `Email: ${ev.guestEmail}\n` +
                      `Name: ${ev.guestName}\n` +
                      `Phone: ${ev.guestPhone}\n` +
                      `Notes: ${ev.notes}`;

                    return (
                      <div
                        key={ev.id}
                        style={style}
                        title={tooltip}
                        onClick={() => setSelectedEvent(ev)}
                        className={`absolute p-2 rounded-md cursor-pointer text-xs overflow-hidden 
                          ${
                            pinned
                              ? "bg-emerald-500 shadow-lg"
                              : "bg-blue-500 hover:bg-blue-600"
                          }
                        `}
                      >
                        <div className="font-semibold truncate">
                          {ev.title}
                        </div>
                        <div className="text-[11px]">
                          {ev.startTime} - {ev.endTime}
                        </div>

                        {pinned && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePin(ev);
                            }}
                            className="absolute top-1 right-1 text-[10px] px-2 py-0.5 bg-black/30 rounded hover:bg-black/50"
                          >
                            Unpin
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Popup Pin Toggle */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className={`${darkMode ? 'bg-slate-900' : 'bg-white'} p-6 border ${borderColor} rounded-lg w-80`}>
            <h2 className={`text-lg font-semibold mb-3 ${textPrimary}`}>
              {selectedEvent.title}
            </h2>

            <div className={`text-sm ${textTertiary} space-y-1`}>
              <p>
                <strong>Time: </strong>
                {selectedEvent.startTime} - {selectedEvent.endTime}
              </p>
              <p>
                <strong>Date: </strong>
                {formatDate(selectedEvent.date)}
              </p>
              {selectedEvent.guestName && (
                <p>
                  <strong>Name: </strong>
                  {selectedEvent.guestName}
                </p>
              )}
              {selectedEvent.guestEmail && (
                <p>
                  <strong>Email: </strong>
                  {selectedEvent.guestEmail}
                </p>
              )}
              {selectedEvent.guestPhone && (
                <p>
                  <strong>Phone: </strong>
                  {selectedEvent.guestPhone}
                </p>
              )}
              {selectedEvent.notes && (
                <p>
                  <strong>Notes: </strong>
                  {selectedEvent.notes}
                </p>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => togglePin(selectedEvent)}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded"
              >
                {isPinned(selectedEvent.id) ? "Unpin" : "Pin"}
              </button>

              <button
                onClick={() => setSelectedEvent(null)}
                className={`w-full py-2 ${bgSecondary} ${hoverBgSecondary} rounded`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VIPCalendar;
