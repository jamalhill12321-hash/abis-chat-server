// Replace with your Supabase URL + public key
const SUPABASE_URL = "YOUR_URL";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function sendMessage() {
  const msg = document.getElementById("messageInput").value;
  if (!msg) return;

  await client.from("messages").insert([{ text: msg }]);
  document.getElementById("messageInput").value = "";
}

client
  .channel("public:messages")
  .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, (payload) => {
    const div = document.getElementById("messages");
    const p = document.createElement("p");
    p.textContent = payload.new.text;
    div.appendChild(p);
  })
  .subscribe()
