import fetch from "node-fetch";

export default async function handler(req, res) {
  console.log("📨 Incoming request:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed you" });
  }

  const { name, title, message } = req.body;

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_aonzbxg",
        template_id: "template_lspd2cr",
        user_id: "mTPW7LkGw3fjdDrDX",
        template_params: {
          'title': title,
          'name': name,
          'message': message,
        },
      }),
    });

    const text = await response.text();
    console.log("📤 EmailJS response:", text);

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ error: text });
    }
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return res.status(500).json({ error: err.toString() });
  }
}
