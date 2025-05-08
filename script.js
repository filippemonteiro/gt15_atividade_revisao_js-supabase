const supabaseUrl = 'https://xabnynfkexvukvakcfeh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhYm55bmZrZXh2dWt2YWtjZmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwMzE0OTQsImV4cCI6MjA2MTYwNzQ5NH0.5ObUAyQavWkeHT0xwdeaoRMIcNSy9NHCGNPxoGimLp4';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);


// Array de produtos
async function carregarProdutos() {
  const { data, error } = await supabase
    .from('produtos')
    .select('*');

  if (error) {
    console.error("Erro ao buscar produtos:", error);
    return;
  }

  exibirProdutos(data);
}

function exibirProdutos(produtos) {
  const container = document.querySelector('#produtos');
  container.innerHTML = "";

  produtos.forEach(produto => {
    container.innerHTML += `
      <div class="produto">
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>R$ ${produto.preco.toFixed(2)}</p>
      </div>
    `;
  });
}

// Chama ao iniciar
carregarProdutos();



function formataPreco(preco) {
  return preco.toLocaleString('pt-BR', 
  { 
    style: 'currency', 
    currency: 'BRL' 
  })
}

function renderizarProdutos() {
  const produtosContainer = document.getElementById('produtos');

  produtosContainer.innerHTML = '';

  const produtosHTML = produtos.map(produto => {
    const produtoCard = document.createElement('div');
    produtoCard.className = 'produto-card';

    const produtoInfo = document.createElement('div');
    produtoInfo.className = 'produto-info';

    const produtoNome = document.createElement('h3');
    produtoNome.className = 'produto-nome';
    produtoNome.textContent = produto.nome

    const produtoDescricao = document.createElement('p');
    produtoDescricao.className = 'produto-descricao';
    produtoDescricao.textContent = produto.descricao

    const produtoPreco = document.createElement('div');
    produtoPreco.className = 'produto-preco';
    
    if (produto.temDesconto) {
      const precoOriginal = document.createElement('span');
      precoOriginal.className = 'preco-original';
      precoOriginal.textContent = formataPreco(produto.precoOriginal);

      const precoDesconto = document.createElement('span');
      precoDesconto.className = 'preco-desconto';
      precoDesconto.textContent = formataPreco(produto.preco);

      produtoPreco.appendChild(precoOriginal);
      produtoPreco.appendChild(precoDesconto);
    } else {
      produtoPreco.textContent = formataPreco(produto.preco);
    }
    produtoInfo.appendChild(produtoNome);
    produtoInfo.appendChild(produtoDescricao);
    produtoInfo.appendChild(produtoPreco);

    produtoCard.appendChild(produtoInfo);

    return produtoCard;
  });

  produtosHTML.forEach(card => {
    produtosContainer.appendChild(card);
  });

}

function aplicarDesconto() {
  produtos.forEach(produto => {
    if (!produto.temDesconto) {
      produto.precoOriginal = produto.preco;
      produto.preco = produto.preco * 0.9;
      produto.temDesconto = true;
    }
  });

  renderizarProdutos()
}

document.getElementById('aplicarDesconto').addEventListener('click', aplicarDesconto);

document.addEventListener('DOMContentLoaded',  renderizarProdutos);
