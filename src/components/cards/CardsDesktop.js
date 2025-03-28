import Card from "./Card";

const cardsTop = [
  {
    titulo: "Apoio Comunitário",
    paragrafo:
      "A atuação da Casa São Camilo de Lelis só é possível graças ao apoio contínuo que recebemos da comunidade. Realizamos bazares e campanhas de doação ao longo do ano, buscando arrecadar alimentos, produtos de limpeza e roupas de cama e banho. Eventos beneficentes também são promovidos pela direção e voluntários da Casa para angariar fundos e garantir a continuidade de nossos serviços.",
  },
  {
    titulo: "Acompanhamento Médico",
    paragrafo:
      "A instituição presta acompanhamento médico, odontológico e fisioterapêutico aos acolhidos. Contamos com uma equipe médica voluntária e oferecemos atendimento em clínica geral, endocrinologia, psiquiatria e cardiologia.",
  },
  {
    titulo: "Um Lar",
    paragrafo: "A instituição é um espaço onde nos sentimos seguros, cuidados e amparados, a instituição se propõe a ser esse refúgio para aqueles que mais necessitam.",
  },
];
const cardsBot = [
  {
    titulo: "Bazar",
    paragrafo:
      "Vendas de roupas doadas para angariar fundos. Locais: Rua Santo Antônio n°1530, Rua Mister Moore n°25 e Av. Gov. Valadares n°543",
  },
  {
    titulo: "Oficina de Artesanato",
    paragrafo:
      "Contamos com aulas semanais de artesanato, com o intuito de estimular os sentidos, auxiliar o desenvolvimento da coordenação motora, desenvolver a criatividade e incentivar a percepção das cores. Fazendo utensílios, artes e decorações a partir de folhas de jornais, palitos, garrafas PET e outros materiais recicláveis.",
  },
];

export default function Cards() {
  return (
    <div className="cardsDesktop" id="programas">
      <div className="cards-line">
        {cardsTop.map((c) => {
          return <Card titulo={c.titulo} paragrafo={c.paragrafo} />;
        })}
      </div>
      <div className="cards-line">
        {cardsBot.map((c) => {
          return <Card titulo={c.titulo} paragrafo={c.paragrafo} />;
        })}
      </div>
    </div>
  );
}
