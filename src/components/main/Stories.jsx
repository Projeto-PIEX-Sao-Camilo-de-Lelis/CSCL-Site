import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";

export default function Stories() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const posts = [
    {
      id: 1,
      title: "Restaurando Laços",
      contentPreview:
        "Um senhor, que foi encaminhado para a Casa São Camilo de Lelis pelos sobrinhos, pois estava afastado de toda a família, incluindo os quatro filhos e a esposa, a quem sempre se referia como 'amor da minha vida'. Embora houvesse carinho, seu alcoolismo acabou afastando todos, e o relacionamento se deteriorou a ponto de ela não conseguir mais lidar. A situação familiar dele era tão difícil que seu irmão herdou a curatela, ele ficou sob nossos cuidados por muito tempo, já em uma condição física debilitada, utilizando uma cadeira de rodas, mas ainda comunicativo. Durante o período em que esteve aqui, tentamos reaproximação dos filhos, que guardavam mágoas por conta de sua ausência e do comportamento prejudicial nas raras aparições nos eventos familiares. Com o tempo e o apoio da Casa, os filhos passaram a visitá-lo semanalmente, e até mesmo sua ex-companheira, já casada com outra pessoa passou a vir à instituição. Um dos momentos mais emocionantes foi quando ele teve a chance de conduzir sua filha ao altar no dia do casamento. Esse ato simbolizou uma reconciliação significativa com a família, permitindo que ele partisse em paz, deixando uma memória de uma jornada marcada por desafios e pela reconciliação.",
    },
    {
      id: 2,
      title: "Ventania",
      contentPreview:
        "Um rapaz que chamávamos de Ventania. Ele veio para a Casa São Camilo de Lelis após viver um tempo nas ruas, enfrentando problemas sérios com alcoolismo, embora fosse uma pessoa muito querida. Quando chegou, sofria com uma hérnia inguinal que foi necessário uma cirurgia urgente. Durante o procedimento, Ventania teve uma hemorragia e quase não resistiu. O médico foi claro: se continuasse a beber, ele não sobreviveria. Ficou na Casa por um tempo, e durante este período conseguimos para ele o Benefício de Prestação Continuada (BPC). Com isso, ele poderia se reestruturar e deixar a instituição. Atualmente, mora em sua cidade natal, trabalha em pequenos serviços e está bem. Depois da pandemia, Ventania nos visitou para contar que parou de beber, casou-se e deu a volta por cima. Foi emocionante vê-lo reencontrar alguns amigos que ainda estavam na instituição e funcionários, mostrando o quanto sua vida mudou.",
    },
    {
      id: 3,
      title: "Da Dor à Alegria",
      contentPreview:
        "Um morador atual (2024) que vivia dormindo na porta de uma garagem. Em uma noite, um carro com os faróis apagados passou por cima do pé dele. Ele foi levado ao Hospital de Pronto Socorro (HPS), onde fez um enxerto, mas depois de receber alta, voltou para a rua. A situação se complicou, e ele acabou desenvolvendo uma infecção, que trouxe muitos problemas. Retornou à instituição e desde então está conosco e, embora tivesse que passar por uma cirurgia para finalizar o tratamento, a cicatrização ocorreu bem e ele não precisou mais do procedimento. Agora, sua filha irá se casar e ele será o padrinho. Já arrumou o terno e está animado para entrar com a filha na igreja.",
    },
    {
      id: 4,
      title: "Novos Olhos, Novas Histórias",
      contentPreview:
        "Uma senhora que chegou à Casa São Camilo de Lelis praticamente cega, trazida pela filha. Enfrentou grandes dificuldades, especialmente por conta das limitações das instalações da instituição, que é uma casa antiga e não possui adaptações adequadas. Para piorar, a senhora não tinha nenhum documento além da certidão de nascimento, o que a impedia de ter acesso a cirurgia pelo SUS, já que a identidade é necessária. No entanto, uma amiga voluntária conversou com um médico oftalmologista de uma clínica de olhos, e ele se prontificou a operá-la. A cirurgia para remoção de catarata foi um sucesso! Ele não só operou um olho, mas ambos e com a ajuda de colírios e acompanhamento, ela começou a enxergar novamente. Posteriormente a levamos para fazer a identidade e CPF, e mesmo não sendo mais obrigada, fez questão de fazer o título de eleitor e votar na eleição municipal. É uma alegria vê-la tão empoderada, e o Dr. continua operando e ajudando todos que precisam, sempre preocupado em fazer a diferença na vida das pessoas.",
    },
    {
      id: 5,
      title: "A Jornada da Recuperação",
      contentPreview:
        "Um senhor que teve um problema gravíssimo na visão (2024). Ele foi operado por um médico oftalmologista, de uma clínica de olhos particular há cerca de três meses. A cirurgia foi complexa e requer cuidados contínuos. O médico não cobrou nada pela operação e ainda ajudou com os colírios necessários para o tratamento. O atendimento é o mesmo, a gente foi para a sala de espera da clínica independente de sermos atendidos como particulares ou não. O senhor começou a enxergar novamente, mas devido à sua necessidade de trabalhar, pediu alta antes de concluir todo o pós-operatório e mesmo assim, o médico vem acompanhando seu tratamento.",
    },
  ];

  return (
    <div
      className="w-full min-h-[100vh] flex flex-col justify-center items-center bg-secondary p-4 relative overflow-hidden p-[1rem]
        after:content-[''] after:absolute after:top-0 after:left-0
        after:w-screen after:h-full after:bg-black after:opacity-[0.80]
        after:mix-blend-multiply after:grayscale after:z-0"
      style={{ backgroundImage: `url(/assets/backgrounds/historias.jpg)` }}
      id="stories"
    >
      <button
        ref={prevRef}
        className="z-20 absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl font-bold text-[#a61a19]"
      >
        &#10094;
      </button>
      <button
        ref={nextRef}
        className="z-20 absolute right-4 top-1/2 transform -translate-y-1/2 text-4xl font-bold text-[#a61a19]"
      >
        &#10095;
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        slidesPerView={1}
        spaceBetween={20}
        className="w-full min-h-[100vh] z-10"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="flex flex-col gap-4 justify-center items-center text-white p-6 max-w-4xl min-h-[90vh] mx-auto">
              <h3 className="text-[2rem] font-bold">{post.title}</h3>
              <p className="text-justify text-[1rem] md:text-[1.2rem]">
                {post.contentPreview}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: grey !important;
          opacity: 0.5;
        }

        .swiper-pagination-bullet-active {
          background-color: #a61a19 !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
