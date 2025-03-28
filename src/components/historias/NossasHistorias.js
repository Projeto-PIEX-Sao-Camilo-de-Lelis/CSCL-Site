import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/carrossel.css";

export default function NossasHistorias() {
  const [size, setSize] = useState(100);
  const { ref, inView } = useInView({
    threshold: 0.1, // Zoom começa quando 10% do componente é visível
  });

  useEffect(() => {
    if (inView) {
      const handleScroll = () => {
        const newSize = 100 + (window.scrollY - window.innerHeight) * 0.05;
        setSize(newSize);
      };

      // Adiciona o evento de rolagem enquanto o componente está visível
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll); // Limpeza
      };
    } else {
      setSize(100); // Reseta o zoom ao sair da visualização
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="container-historias"
      style={{ backgroundSize: `${size}vw ${size}vh` }}
      id="historias"
    >
      <h1>Nossas Histórias</h1>
      <div className="container-carrossel">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={50}
          slidesPerView={1}
          className="carousel"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="slide-content">
              <div className="slide-text">
                <h3>Restaurando Laços</h3>
                <p>
                  Um senhor, que foi encaminhado para a Casa São Camilo de Lelis
                  pelos sobrinhos, pois estava afastado de toda a família,
                  incluindo os quatro filhos e a esposa, a quem sempre se
                  referia como 'amor da minha vida'. Embora houvesse carinho,
                  seu alcoolismo acabou afastando todos, e o relacionamento se
                  deteriorou a ponto de ela não conseguir mais lidar. A situação
                  familiar dele era tão difícil que seu irmão herdou a curatela,
                  ele ficou sob nossos cuidados por muito tempo, já em uma
                  condição física debilitada, utilizando uma cadeira de rodas,
                  mas ainda comunicativo. Durante o período em que esteve aqui,
                  tentamos reaproximação dos filhos, que guardavam mágoas por
                  conta de sua ausência e do comportamento prejudicial nas raras
                  aparições nos eventos familiares. Com o tempo e o apoio da
                  Casa, os filhos passaram a visitá-lo semanalmente, e até mesmo
                  sua ex-companheira, já casada com outra pessoa passou a vir a
                  instituição. Um dos momentos mais emocionantes foi quando ele
                  teve a chance de conduzir sua filha ao altar no dia do
                  casamento. Esse ato simbolizou uma reconciliação significativa
                  com a família, permitindo que ele partisse em paz, deixando
                  uma memória de uma jornada marcada por desafios e pela
                  reconciliação.
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 2 */}
          <SwiperSlide>
            <div className="slide-content">
              <div className="slide-text">
                <h3>Ventania</h3>
                <p>
                  Um rapaz que chamávamos de Ventania. Ele veio para a Casa São
                  Camilo de Lelis após viver um tempo nas ruas, enfrentando
                  problemas sérios com alcoolismo, embora fosse uma pessoa muito
                  querida. Quando chegou, sofria com uma hérnia inguinal que foi
                  necessário uma cirurgia urgente. Durante o procedimento,
                  Ventania teve uma hemorragia e quase não resistiu. O médico
                  foi claro: se continuasse a beber, ele não sobreviveria. Ficou
                  na Casa por um tempo, e durante este período conseguimos para
                  ele o Benefício de Prestação Continuada (BPC). Com isso, ele
                  poderia se reestruturar e deixar a instituição. Atualmente,
                  mora em sua cidade natal, trabalha em pequenos serviços e está
                  bem. Depois da pandemia, Ventania nos visitou para contar que
                  parou de beber, casou-se e deu a volta por cima. Foi
                  emocionante vê-lo reencontrar alguns amigos que ainda estavam
                  na instituição e funcionários, mostrando o quanto sua vida
                  mudou.
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 3 */}
          <SwiperSlide>
            <div className="slide-content">
              <div className="slide-text">
                <h3>Da Dor à Alegria</h3>
                <p>
                  Um morador atual (2024) que vivia dormindo na porta de uma
                  garagem. Em uma noite, um carro com os faróis apagados, passou
                  por cima do pé dele. Ele foi levado ao Hospital de Pronto
                  Socorro (HPS), onde fez um enxerto, mas depois de receber
                  alta, voltou para a rua. A situação se complicou, e ele acabou
                  desenvolvendo uma infecção, que trouxe muitos problemas.
                  Retornou à instituição e desde então, está conosco e embora
                  tivesse que passar por uma cirurgia para finalizar o
                  tratamento, a cicatrização ocorreu bem, e ele não precisou
                  mais do procedimento. Agora, sua filha irá se casar e ele será
                  o padrinho. Já arrumou o terno e está animado para entrar com
                  a filha na igreja.
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 4 */}
          <SwiperSlide>
            <div className="slide-content">
              <div className="slide-text">
                <h3>Novos Olhos, Novas Histórias</h3>
                <p>
                  Uma senhora que chegou à Casa São Camilo de Lelis praticamente
                  cega, trazida pela filha. Enfrentou grandes dificuldades,
                  especialmente por conta das limitações das instalações da
                  instituição, que é uma casa antiga e não possui adaptações
                  adequadas. Para piorar, a senhora não tinha nenhum documento
                  além da certidão de nascimento, o que a impedia ter acesso a
                  cirurgia pelo SUS, já que a identidade é necessária. No
                  entanto, uma amiga voluntária conversou com um médico
                  oftalmologista de uma clínica de olhos, e ele se prontificou a
                  operá-la. A cirurgia para remoção de catarata foi um sucesso!
                  Ele não só operou um olho, mas ambos e com a ajuda de colírios
                  e acompanhamento, ela começou a enxergar novamente.
                  Posteriormente a levamos para fazer a identidade e CPF, e
                  mesmo não sendo mais obrigada, fez questão de fazer o título
                  de eleitor e votar na eleição municipal. É uma alegria vê-la
                  tão empoderada, e o Dr. continua operando e ajudando todos que
                  precisam, sempre preocupado em fazer a diferença na vida das
                  pessoas.
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* Slide 5 */}
          <SwiperSlide>
            <div className="slide-content">
              <div className="slide-text">
                <h3>A Jornada da Recuperação</h3>
                <p>
                  Um senhor que teve um problema gravíssimo na visão (2024). Ele
                  foi operado por um médico oftalmologista, de uma clínica de
                  olhos particular há cerca de três meses. A cirurgia foi
                  complexa e requer cuidados contínuos. O médico não cobrou nada
                  pela operação e ainda ajudou com os colírios necessários para
                  o tratamento. O atendimento é o mesmo, a gente foi para a sala
                  de espera da clínica independente de sermos atendidos como
                  particulares ou não. O senhor começou a enxergar novamente,
                  mas devido à sua necessidade de trabalhar, pediu alta antes de
                  concluir todo o pós-operatório e mesmo assim, o médico vem
                  acompanhando seu tratamento.
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
