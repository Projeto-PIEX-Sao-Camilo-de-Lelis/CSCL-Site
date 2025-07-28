import { useState } from "react";
import { FaCopy, FaCheck, FaUniversity, FaQrcode, FaDollarSign } from "react-icons/fa";

export default function Donations() {
  const [copiedField, setCopiedField] = useState("");
  const [activeTab, setActiveTab] = useState("pix");

  const bankInfo = {
    banco: "BANCO DO BRASIL",
    instituicaoPix: "CECM MEDICOS E PROFISSIONAIS AREA SAUDE DO BRASIL",
    agencia: "2995-5",
    conta: "177.181-7",
    cnpj: "17.143.512/0001-00",
    chavePix: "17.143.512/0001-00",
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  return (
    <div
      className="relative w-full min-h-[70vh] bg-gradient-to-br from-main via-main/95 to-red-800 text-whiteColor overflow-hidden"
      id="donations"
    >
      <div className="absolute inset-0 bg-[url('/assets/patterns/dots.svg')] opacity-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-6 py-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">FAÇA A DIFERENÇA</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Ajude a <span className="text-yellow-400">transformar vidas</span>
            <br />
            com a sua doação!
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Cada contribuição nos ajuda a oferecer abrigo, alimentação e dignidade para pessoas em
            situação de vulnerabilidade social.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 flex gap-1">
            <button
              onClick={() => setActiveTab("pix")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "pix"
                  ? "bg-white text-main shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <FaDollarSign className="text-lg" />
              PIX
            </button>
            <button
              onClick={() => setActiveTab("bank")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === "bank"
                  ? "bg-white text-main shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <FaUniversity className="text-lg" />
              Transferência
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {activeTab === "pix" && (
            <>
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <FaDollarSign className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Doação via PIX</h3>
                      <p className="text-white/80">Doe através da chave PIX</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <label className="text-sm text-white/70 block mb-2">Chave PIX (CNPJ)</label>
                      <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                        <span className="font-mono sm:text-sm text-lg">{bankInfo.chavePix}</span>
                        <button
                          onClick={() => copyToClipboard(bankInfo.chavePix, "pix")}
                          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg transition-colors duration-300"
                        >
                          {copiedField === "pix" ? <FaCheck /> : <FaCopy />}
                          <span className="hidden lg:inline">
                            {copiedField === "pix" ? "Copiado!" : "Copiar"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <label className="text-sm text-white/70 block mb-2">Beneficiário</label>
                      <div className="bg-white/10 rounded-lg p-3">
                        <span className="font-semibold">Casa São Camilo de Lelis</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <label className="text-sm text-white/70 block mb-2">
                          Instituição bancária
                        </label>
                        <div className="bg-white/10 rounded-lg p-3">
                          <span className="font-semibold">{bankInfo.instituicaoPix}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <FaQrcode className="text-2xl" />
                    <h3 className="text-2xl font-bold">QR Code PIX</h3>
                  </div>

                  <div className="flex flex-col items-center justify-center flex-1 py-4">
                    <div className="bg-white rounded-2xl p-6 shadow-2xl mb-4">
                      <img
                        alt="QR Code para doação via Pix"
                        src="/assets/img/pix.png"
                        className="w-48 h-48 mx-auto"
                      />
                    </div>
                    <p className="text-white/80 text-center mt-5">
                      Escaneie com a câmera do seu celular ou app do banco
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "bank" && (
            <>
              <div className="flex justify-center mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 w-full max-w-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaUniversity className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Transferência Bancária</h3>
                      <p className="text-white/80">Depósito ou TED</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <label className="text-sm text-white/70 block mb-2">
                        Nome da Instituição
                      </label>
                      <div className="bg-white/10 rounded-lg p-3">
                        <span className="font-semibold">Casa São Camilo de Lelis</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-lg p-4">
                        <label className="text-sm text-white/70 block mb-2">Banco</label>
                        <div className="bg-white/10 rounded-lg p-3">
                          <span className="font-semibold">{bankInfo.banco}</span>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-4">
                        <label className="text-sm text-white/70 block mb-2">Agência</label>
                        <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                          <span className="font-mono">{bankInfo.agencia}</span>
                          <button
                            onClick={() => copyToClipboard(bankInfo.agencia, "agencia")}
                            className="text-white/60 hover:text-white transition-colors"
                          >
                            {copiedField === "agencia" ? <FaCheck /> : <FaCopy />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <label className="text-sm text-white/70 block mb-2">Conta Corrente</label>
                      <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                        <span className="font-mono text-lg">{bankInfo.conta}</span>
                        <button
                          onClick={() => copyToClipboard(bankInfo.conta, "conta")}
                          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-lg transition-colors duration-300"
                        >
                          {copiedField === "conta" ? <FaCheck /> : <FaCopy />}
                          <span className="hidden lg:inline">
                            {copiedField === "conta" ? "Copiado!" : "Copiar"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4">
                      <label className="text-sm text-white/70 block mb-2">CNPJ</label>
                      <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                        <span className="font-mono">{bankInfo.cnpj}</span>
                        <button
                          onClick={() => copyToClipboard(bankInfo.cnpj, "cnpj-bank")}
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          {copiedField === "cnpj-bank" ? <FaCheck /> : <FaCopy />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 w-full max-w-lg">
              <h3 className="text-xl font-bold mb-4 text-center">Outras formas de ajudar</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 bg-main rounded-full"></div>
                  <span>Trabalho voluntário</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 bg-main rounded-full"></div>
                  <span>Roupas de cama e banho</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 bg-main rounded-full"></div>
                  <span>Divulgação da nossa causa</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-2 h-2 bg-main rounded-full"></div>
                  <span>Doação de alimentos e produtos de higiene</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-white/20">
          <p className="text-white/80">
            Dúvidas sobre doações? Entre em contato:
            <a
              href="mailto:casasaocamilodelelis@gmail.com"
              className="text-yellow-400 hover:underline ml-1"
            >
              casasaocamilodelelis@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
