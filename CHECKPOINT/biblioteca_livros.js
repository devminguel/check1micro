"use strict";
var _a, _b, _c;
class Biblioteca {
    constructor() {
        this.livros = [];
        this.proximoId = 1;
    }
    adicionarLivro(livro) {
        const novoLivro = Object.assign({ id: this.proximoId++ }, livro);
        this.livros.push(novoLivro);
        this.atualizarLista();
    }
    buscarPorAutor(autor) {
        return this.livros.filter(livro => livro.autor.toLowerCase().includes(autor.toLowerCase()));
    }
    editarLivro(id, dadosAtualizados) {
        const livroIndex = this.livros.findIndex(livro => livro.id === id);
        if (livroIndex === -1)
            return false;
        this.livros[livroIndex] = Object.assign(Object.assign({}, this.livros[livroIndex]), dadosAtualizados);
        this.atualizarLista();
        return true;
    }
    getTodosLivros() {
        return this.livros;
    }
    atualizarLista() {
        const container = document.getElementById('livros-container');
        if (!container)
            return;
        container.innerHTML = '';
        this.livros.forEach(livro => {
            const livroCard = document.createElement('div');
            livroCard.className = 'livro-card';
            livroCard.innerHTML = `
                <h3>${livro.titulo}</h3>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Páginas:</strong> ${livro.paginas}</p>
                ${livro.genero ? `<p><strong>Gênero:</strong> ${livro.genero}</p>` : ''}
                <p><strong>ID:</strong> ${livro.id}</p>
            `;
            container.appendChild(livroCard);
        });
    }
}
// Instância da biblioteca
const biblioteca = new Biblioteca();
// Event Listeners
(_a = document.getElementById('form-adicionar')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const paginas = parseInt(document.getElementById('paginas').value);
    const genero = document.getElementById('genero').value;
    biblioteca.adicionarLivro({
        titulo,
        autor,
        paginas,
        genero: genero || undefined
    });
    e.target.reset();
});
(_b = document.getElementById('form-buscar')) === null || _b === void 0 ? void 0 : _b.addEventListener('submit', (e) => {
    e.preventDefault();
    const autor = document.getElementById('busca-autor').value;
    const resultados = biblioteca.buscarPorAutor(autor);
    const container = document.getElementById('livros-container');
    if (container) {
        container.innerHTML = '';
        if (resultados.length === 0) {
            container.innerHTML = '<p>Nenhum livro encontrado para este autor.</p>';
        }
        else {
            resultados.forEach(livro => {
                const livroCard = document.createElement('div');
                livroCard.className = 'livro-card';
                livroCard.innerHTML = `
                    <h3>${livro.titulo}</h3>
                    <p><strong>Autor:</strong> ${livro.autor}</p>
                    <p><strong>Páginas:</strong> ${livro.paginas}</p>
                    ${livro.genero ? `<p><strong>Gênero:</strong> ${livro.genero}</p>` : ''}
                `;
                container.appendChild(livroCard);
            });
        }
    }
});
(_c = document.getElementById('form-editar')) === null || _c === void 0 ? void 0 : _c.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = parseInt(document.getElementById('editar-id').value);
    const titulo = document.getElementById('editar-titulo').value;
    const autor = document.getElementById('editar-autor').value;
    const paginas = document.getElementById('editar-paginas').value;
    const dadosAtualizados = {};
    if (titulo)
        dadosAtualizados.titulo = titulo;
    if (autor)
        dadosAtualizados.autor = autor;
    if (paginas)
        dadosAtualizados.paginas = parseInt(paginas);
    const sucesso = biblioteca.editarLivro(id, dadosAtualizados);
    if (sucesso) {
        e.target.reset();
    }
    else {
        alert('Livro não encontrado!');
    }
});
// Inicialização
biblioteca.adicionarLivro({ titulo: "Exemplo", autor: "Autor Exemplo", paginas: 100 });
