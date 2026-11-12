// Algoritmo educacional START adulto. Manual CBMDF 2022, pp. 171–173.
// Não é ferramenta de decisão para ocorrências reais nem substitui triagem pediátrica.
export function classifyStart(patient) {
  if (patient.age < 9) throw new RangeError('Use JumpSTART para o caso pediátrico.');
  if (patient.walks) return { color: 'green', reason: 'Deambula sem ajuda: prioridade 3, com nova avaliação na ACV.' };
  if (!patient.breathes) {
    return patient.breathesAfterOpening
      ? { color: 'red', reason: 'A respiração retornou após abertura da via aérea: prioridade 1.' }
      : { color: 'gray', reason: 'Permanece sem respirar após abertura da via aérea: prioridade 4 neste contexto de START adulto em IMV.' };
  }
  if (patient.rr > 30) return { color: 'red', reason: `FR de ${patient.rr} irpm, acima de 30: prioridade 1.` };
  if (patient.capillary > 2 || patient.radial === false) return { color: 'red', reason: 'Perfusão inadequada (enchimento capilar > 2 s ou pulso radial ausente): prioridade 1.' };
  if (!patient.obeys) return { color: 'red', reason: 'Não executa comando simples: prioridade 1.' };
  return { color: 'yellow', reason: 'Não deambula, mas respira até 30 irpm, mantém perfusão e executa comandos: prioridade 2.' };
}
export function scoreAnswers(questions, answers) {
  const correct = questions.filter((q, i) => answers[i] === q.correct).length;
  return { correct, total: questions.length, percent: questions.length ? Math.round(correct / questions.length * 100) : 0 };
}
export const colors = {
  red: { label: 'Vermelho', priority: '1 · Imediato' },
  yellow: { label: 'Amarelo', priority: '2 · Pode aguardar' },
  green: { label: 'Verde', priority: '3 · Menor prioridade' },
  gray: { label: 'Cinza / preto', priority: '4 · Critério de IMV' }
};
