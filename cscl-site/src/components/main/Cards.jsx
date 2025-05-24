import Card from "../card/Card";

const cardsTop = [
  {
    key: 1,
    title: "Apoio Comunitário",
    para: "A atuação da Casa São Camilo de Lelis só é possível graças ao apoio contínuo que recebemos da comunidade. Realizamos bazares e campanhas de doação ao longo do ano, buscando arrecadar alimentos, produtos de limpeza e roupas de cama e banho. Eventos beneficentes também são promovidos pela direção e voluntários da Casa para angariar fundos e garantir a continuidade de nossos serviços.",
    img: "apoio.png",
  },
  {
    key: 2,
    title: "Acompanhamento Médico",
    para: "A instituição presta acompanhamento médico, odontológico e fisioterapêutico aos acolhidos. Contamos com uma equipe médica voluntária e oferecemos atendimento em clínica geral, endocrinologia, psiquiatria e cardiologia.",
    img: "bazar.jpg",
  },
  {
    key: 3,
    title: "Um Lar",
    para: "A instituição é um espaço onde nos sentimos seguros, cuidados e amparados, a instituição se propõe a ser esse refúgio para aqueles que mais necessitam.",
    img: "lar.jpg",
  },
];
const cardsBot = [
  {
    key: 4,
    title: "Bazar",
    para: "Vendas de roupas doadas para angariar fundos. Locais: Rua Santo Antônio n°1530, Rua Mister Moore n°25 e Av. Gov. Valadares n°543",
    img: "bazar.jpg",
  },
  {
    key: 5,
    title: "Oficina de Artesanato",
    para: "Contamos com aulas semanais de artesanato, com o intuito de estimular os sentidos, auxiliar o desenvolvimento da coordenação motora, desenvolver a criatividade e incentivar a percepção das cores. Fazendo utensílios, artes e decorações a partir de folhas de jornais, palitos, garrafas PET e outros materiais recicláveis.",
    img: "artesanato.jpg",
  },
];

export default function Cards() {
  return (
    <div
      className="w-full h-[100vh] flex flex-col justify-center items-center bg-whiteColor gap-[1rem]"
      id="cards"
    >
      <div className="md:flex md:flex-col md:justify-center md:items-center hidden">
        <div className="flex flex-row gap-[1rem] ">
          {cardsTop.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              para={card.para}
              img={card.img}
            />
          ))}
        </div>

        <div className="flex flex-row gap-[1rem]">
          {cardsBot.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              para={card.para}
              img={card.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
