import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// GET /mensagens — lista todas as mensagens (mais recentes primeiro, com dados do autor)
export async function listarMensagens(req, res) {
  const mensagens = await prisma.mensagem.findMany({
    orderBy: { criadoEm: 'desc' },  // mais recente primeiro
    include: {
      autor: {                        // traz dados do autor junto
        select: {
          nome: true,                 // nome do autor
          fotoUrl: true,              // foto do autor
        },
      },
    },
  });
  res.json(mensagens); // retorna a lista com autor embutido
}

// --- Stubs para o desafio do aluno ---

// 🎯 POST /mensagens — cria uma nova mensagem
// Siga o mesmo padrão do criarAluno
// Valide que texto não está vazio (400 se faltar)
export async function criarMensagem(req, res) {
  try {
    const { texto, autorId } = req.body;

    if (!texto || texto.trim() === '') {
      return res.status(400).json({ erro: 'O texto da mensagem não pode estar vazio.' });
    }

    const novaMensagem = await prisma.mensagem.create({
      data: {
        texto,
        autorId,
      },
    });

    res.status(201).json(novaMensagem);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

// 🎯 DELETE /mensagens/:id — deleta uma mensagem
// Siga o mesmo padrão do deletarAluno
export async function deletarMensagem(req, res) {
  try {
    const id = parseInt(req.params.id);

    await prisma.mensagem.delete({
      where: { id },
    });

    res.json({ message: 'Mensagem deletada com sucesso' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ 
        message: 'Mensagem não encontrada', 
        erro: 'Mensagem não encontrada' 
      });
    }
    res.status(500).json({ erro: error.message });
  }
}