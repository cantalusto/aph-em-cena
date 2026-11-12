import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyStart, scoreAnswers } from '../clinical.js';
import { patients, scenarios, protocols, flashcards, skillDrills, source } from '../content.js';

const base = {age:30,walks:false,breathes:true,rr:24,capillary:2,radial:true,obeys:true};
test('START: quem deambula sem ajuda recebe verde inicial',()=>assert.equal(classifyStart({...base,walks:true}).color,'green'));
test('START: FR exatamente 30 não aciona o critério de >30',()=>assert.equal(classifyStart({...base,rr:30}).color,'yellow'));
test('START: FR acima de 30 é vermelho',()=>assert.equal(classifyStart({...base,rr:31}).color,'red'));
test('START: capilar exatamente 2s permite seguir; acima disso é vermelho',()=>{
 assert.equal(classifyStart(base).color,'yellow');
 assert.equal(classifyStart({...base,capillary:2.1}).color,'red');
});
test('START: pulso radial ausente é vermelho mesmo sem TEC avaliável',()=>assert.equal(classifyStart({...base,capillary:null,radial:false}).color,'red'));
test('START: incapacidade de executar comando é vermelho',()=>assert.equal(classifyStart({...base,obeys:false}).color,'red'));
test('START: apneia persistente após abertura é cinza, respiração recuperada é vermelho',()=>{
 assert.equal(classifyStart({...base,breathes:false,breathesAfterOpening:false}).color,'gray');
 assert.equal(classifyStart({...base,breathes:false,breathesAfterOpening:true}).color,'red');
});
test('Crianças não são classificadas pelo algoritmo adulto',()=>assert.throws(()=>classifyStart({...base,age:8}),RangeError));
test('Casos de treino abrangem as quatro prioridades e têm gabarito auditado',()=>{
 const expected=['green','red','yellow','gray','red','red','red','yellow','yellow','red','green','red'];
 assert.deepEqual(patients.map(p=>classifyStart(p).color),expected);
});
test('Pontuação de raciocínio corresponde às escolhas, incluindo não respondidas',()=>{
 assert.deepEqual(scoreAnswers([{correct:'red'},{correct:'yellow'},{correct:'green'}],['red','red']),{correct:1,total:3,percent:33});
});
test('Referências respeitam o deslocamento de duas páginas do arquivo PDF',()=>assert.match(source(172),/#page=174/));
test('Todas as etapas, protocolos e cartões têm páginas do manual válidas',()=>{
 const refs=[...protocols.map(p=>p.page),...scenarios.flatMap(s=>s.phases.map(p=>p.criterion.page)),...flashcards.map(c=>c[2]),...skillDrills.map(d=>d.page)];
 for(const p of refs)assert.ok(Number.isInteger(p)&&p>=44&&p<=174);
 for(const scenario of scenarios){assert.ok(scenario.phases.length>=4);for(const phase of scenario.phases){assert.equal(phase.criterion.checks.length,3);assert.ok(phase.finding&&phase.prompt&&phase.criterion.say);}}
});
