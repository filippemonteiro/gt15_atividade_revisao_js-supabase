const SUPABASE_URL = "https://dnahbahhkckatsijdggw.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuYWhiYWhoa2NrYXRzaWpkZ2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MjM5NDIsImV4cCI6MjA2MjI5OTk0Mn0.hQ857wQ8vMP1hBTw0PvVVypbHf25kFvZI9yoB5NWzFY";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let produtos = [];

async function carregarProdutos() {
  const container = document.getElementById("produtos");
  container.innerHTML = "<p>Carregando produtos...</p>";

  const { data, error } = await client.from("produtos").select("*");

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    container.innerHTML = "<p>Erro ao carregar produtos.</p>";
    return;
  }

  produtos = data;
  exibirProdutos(false);
}

function exibirProdutos(comDesconto = false) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  produtos.forEach((p) => {
    const precoOriginal = Number(p.preco).toFixed(2);
    const precoFinal = comDesconto ? (p.preco * 0.9).toFixed(2) : null;

    const card = document.createElement("div");
    card.classList.add("produto");

    const nome = document.createElement("h3");
    nome.textContent = p.nome;

    const preco = document.createElement("p");
    preco.innerHTML = `<s>R$ ${precoOriginal}</s>`;

    card.appendChild(nome);
    card.appendChild(preco);

    const desconto = document.createElement("p");

    if (comDesconto) {
      desconto.innerHTML = `<strong>R$ ${precoFinal}</strong> (10% OFF)`;
    } else {
      desconto.textContent = "Clique no botão para aplicar desconto";
      desconto.style.color = "gray";
    }

    card.appendChild(desconto);
    container.appendChild(card);
  });
}

document.getElementById("aplicarDesconto").addEventListener("click", () => {
  exibirProdutos(true);
});

carregarProdutos();
