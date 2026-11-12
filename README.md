# APH em Cena

Ferramenta de estudo em português para **ensaiar uma prova prática de atendimento pré-hospitalar**. Criada para um estudante de Enfermagem da UPE; o produto é independente e não representa a universidade ou o Corpo de Bombeiros.

## Experiência

- Três estações com briefing, achados progressivos, cronômetro e debriefing: colisão com quatro adultos, trauma com hemorragia e reavaliação na ACV.
- Modo prova sem dicas e modo guiado com exemplos de verbalização. Um colega pode apresentar os achados e observar a execução em manequim.
- Autoavaliação por condutas observadas; **não avalia automaticamente técnicas físicas nem estima nota oficial**.
- Doze cartões START adulto com correção comentada e limites exatos (FR > 30; TEC > 2 s).
- Roteiro de condutas, quatro fichas de treino com materiais (pressão direta, torniquete, cervical e tala), dezoito cartões de recuperação de memória e plano de estudo de sessenta minutos.
- Quatro temas com luminosidade reduzida: Noite suave (padrão), Neblina, Areia e Sálvia. Seletor no cabeçalho, preferência salva e aplicação antes da primeira pintura.
- Layout responsivo para celular, tablet e desktop; teclado, foco visível e preferência de movimento reduzido.
- Progresso salvo no navegador e conteúdo próprio disponível offline após o primeiro carregamento completo. PDF externo e fontes web precisam de conexão; fontes locais de fallback mantêm o aplicativo utilizável.

## Referência

[Manual de Atendimento Pré-Hospitalar do CBMDF, 2ª edição, Brasília, 2022](https://bombeiros.pb.gov.br/wp-content/uploads/2025/02/1.-MANUAL-DE-APH-ATUALIZADO.pdf), hospedado no portal dos Bombeiros da Paraíba.

Conteúdo principal: capítulo 4, pp. 44–51 (cena e avaliação); capítulo 7, p. 92 (colar); capítulo 8, pp. 117–120 (controle de hemorragias); capítulo 9, p. 134 (imobilização); capítulo 13, pp. 168–174 (IMV, organização, START e JumpSTART). Os links apontam para a página do PDF, que fica duas páginas à frente da numeração impressa. Referência consultada em 12/11/2026. O arquivo original não é redistribuído no repositório.

Casos, tempos, exemplos de falas, rubricas e plano são adaptações didáticas originais. O método START adulto não deve ser generalizado para crianças nem para PCR isolada. A referência a JumpSTART é uma revisão; o simulador de triagem contém apenas adultos.

## Execução

Node.js 22 ou superior. Sem dependências de produção, chaves, banco de dados ou instalação de pacotes.

```sh
npm run dev
# http://127.0.0.1:4173
npm test
npm run build
```

O build copia os arquivos públicos e as duas variantes da ilustração gerada para `dist/`. O servidor local é apenas para desenvolvimento e não deve ser exposto como servidor de produção.

## Publicação na Vercel

Importe este repositório, selecione o framework `Other`, defina `npm run build` como Build Command e `dist` como Output Directory. Não são necessárias variáveis de ambiente. O `vercel.json` inclui essas opções.

## Organização

`content.js`: casos, referências e material didático. `clinical.js`: algoritmo educacional START adulto. `app.js`: interface e estado. `styles.css`: estilos responsivos e de impressão. `sw.js`: cache offline. `tests/clinical.test.mjs`: testes dos critérios de corte, gabaritos e referências.

Não informe dados de pacientes reais no campo de notas. As notas existem somente durante a estação na memória da página. Os dados salvos em localStorage são contagens, escolhas de triagem e marcações do estudo; não há envio para um servidor. A seção “Fonte e escopo” permite apagar o progresso local.

## Uso na prática simulada

Treine com manequim e materiais próprios de simulação. Não aplique torniquetes, força ou procedimentos invasivos em colegas. A execução das técnicas deve seguir o treinamento da disciplina e a orientação do professor. Este aplicativo é material educacional, não ferramenta para conduzir ocorrências reais.
