interface Livro {
    id: number;
    titulo: string;
    autor: string;
    paginas: number;
    genero?: string;
}

class Biblioteca {
     livros: Livro[] = [];
     proximoId: number = 1;

    adicionarLivro(livro: Omit<Livro, 'id'>): void {
        const novoLivro: Livro = {
            id: this.proximoId++,
            ...livro
        };
        this.livros.push(novoLivro);
        this.atualizarLista();
        this.mostrarMensagem('Livro adicionado com sucesso!', 'success');
    }

    buscarPorAutor(autor: string): Livro[] {
        return this.livros.filter(livro =>
            livro.autor.toLowerCase().includes(autor.toLowerCase())
        );
    }

    editarLivro(id: number, dadosAtualizados: Partial<Omit<Livro, 'id'>>): boolean {
        const livroIndex = this.livros.findIndex(livro => livro.id === id);
        if (livroIndex === -1) {
            this.mostrarMensagem(`Livro com ID ${id} não encontrado!`, 'error');
            return false;
        }

        this.livros[livroIndex] = {
            ...this.livros[livroIndex],
            ...dadosAtualizados
        };
        this.atualizarLista();
        this.mostrarMensagem('Livro atualizado com sucesso!', 'success');
        return true;
    }

    getTodosLivros(): Livro[] {
        return this.livros;
    }

    private atualizarLista(livros: Livro[] = this.livros): void {
        const container = document.getElementById('livros-container');
        if (!container) return;

        container.innerHTML = '';
        
        if (livros.length === 0) {
            container.innerHTML = '<p class="info-message">Nenhum livro cadastrado.</p>';
            return;
        }

        livros.forEach(livro => {
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

    private mostrarMensagem(mensagem: string, tipo: 'success' | 'error'): void {
        const container = document.getElementById('lista-livros');
        if (!container) return;

        const mensagemElement = document.createElement('div');
        mensagemElement.className = `${tipo}-message`;
        mensagemElement.textContent = mensagem;
        
        container.prepend(mensagemElement);
        
        setTimeout(() => {
            mensagemElement.remove();
        }, 3000);
    }
}



