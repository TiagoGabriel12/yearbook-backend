import prisma from '../prisma/client.js';

export async function listarMensagens(req, res) {
  try {
    const mensagens = await prisma.mensagem.findMany({
      include: {
        autor: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });
    return res.json(mensagens);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function criarMensagem(req, res) {
  const { texto, autorId } = req.body;

  try {
    const novaMensagem = await prisma.mensagem.create({
      data: {
        texto,
        autorId: Number(autorId),
      },
    });
    return res.status(201).json(novaMensagem);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deletarMensagem(req, res) {
  const { id } = req.params;

  try {
    await prisma.mensagem.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(204).end();
  } catch (error) {
    return res.status(404).json({
      message: 'Mensagem não encontrada',
      error: 'Mensagem não encontrada',
      erro: 'Mensagem não encontrada',
    });
  }
}