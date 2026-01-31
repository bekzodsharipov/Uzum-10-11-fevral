const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwtlyYwY8RsrYpCy-UQX4G0ETF_9DMpR_Qf-cnQi7TS9U5ZN_m466DaUTE-0Wl8Hy6a/exec";

async function sendFormData() {
  const o = localStorage.getItem("formData");
  if (!o) return void console.log("Malumotlar yoq");
  const a = JSON.parse(o),
    e = new FormData();
  e.append("sheetName", "Lead"),
  e.append("Ism", a.Ism),
  e.append("Telefon raqam", a.TelefonRaqam),
    e.append("Royhatdan o'tgan vaqti", a.SanaSoat);
  try {
    if (!(await fetch(SHEET_URL, { method: "POST", body: e })).ok)
      throw new Error("API response was not ok");
    localStorage.removeItem("formData");
  } catch (o) {
    console.error("Error submitting form:", o),
      (document.getElementById("errorMessage").style.display = "block");
  }
}
window.onload = sendFormData;
