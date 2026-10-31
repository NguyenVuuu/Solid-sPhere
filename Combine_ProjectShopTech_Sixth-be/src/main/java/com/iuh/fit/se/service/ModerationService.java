package com.iuh.fit.se.service;



import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ModerationService {

    private final ChatModel chatModel;
    private final ObjectMapper mapper = new ObjectMapper();

    public ModerationResult moderate(String text) {

        String prompt = """
            Bạn là hệ thống kiểm duyệt nội dung.

            Hãy đánh giá xem bình luận sau đây có vi phạm tiêu chuẩn cộng đồng không.
            Các loại vi phạm:
            - Chửi thề, xúc phạm, miệt thị
            - Bạo lực
            - Nội dung 18+
            - Phân biệt đối xử
            - Khuyến khích hành vi phạm pháp
            - Spam, quảng cáo

            ❗❗ YÊU CẦU BẮT BUỘC ❗❗
            ➜ Trả về DUY NHẤT JSON với dạng sau, không thêm chữ nào khác:
            {
              "violate": true/false,
              "reason": "giải thích ngắn gọn"
            }

            Bình luận:
            "%s"
        """.formatted(text);

        String output = chatModel.call(prompt).trim();
        System.out.println("RAW_AI_OUTPUT = " + output);

        try {

            // ✅ Tìm JSON bằng regex → match đoạn {...}
            var m = java.util.regex.Pattern
                    .compile("\\{.*?\\}", java.util.regex.Pattern.DOTALL)
                    .matcher(output);

            if (m.find()) {
                output = m.group(0); // lấy JSON trong dấu ngoặc
            } else {
                throw new RuntimeException("JSON not found");
            }

            JsonNode node = mapper.readTree(output);

            boolean violate = node.get("violate").asBoolean();
            String reason   = node.get("reason").asText();

            return new ModerationResult(violate, reason);

        } catch (Exception e) {

            System.out.println("❌ Parse failed! raw=" + output);

            return new ModerationResult(
                    true,
                    "Hệ thống kiểm duyệt đang bận — vui lòng thử lại."
            );
        }
    }

    public record ModerationResult(boolean violate, String reason) {}
}
