import React from "react";

const ServiceUnavailable = ({
  onRetry,
  message = {
    primary: "Não foi possível exibir as postagens neste momento.",
    secondary:
      "Não se preocupe, estamos trabalhando para que o serviço seja reestabelecido o mais breve possível.",
  },
  showRetryButton = true,
  variant = "default", // Pode ser "default", "compact", "minimal"
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "compact":
        return "p-4 bg-yellow-900/15 border border-zinz-600/50 rounded-lg";
      case "minimal":
        return "p-3 bg-yellow-800/10 border-l-4 border-zinz-600 rounded-r-lg";
      default:
        return "p-6 bg-yellow-900/20 border border-zinc-600 rounded-lg";
    }
  };

  const getIconSize = () => {
    switch (variant) {
      case "compact":
        return "w-8 h-8";
      case "minimal":
        return "w-6 h-6";
      default:
        return "w-12 h-12";
    }
  };

  const getTextSize = () => {
    switch (variant) {
      case "compact":
        return "text-sm";
      case "minimal":
        return "text-xs";
      default:
        return "text-base";
    }
  };

  const renderMessage = () => {
    if (typeof message === "string") {
      return <p className={`text-red-200/80 ${getTextSize()} max-w-md`}>{message}</p>;
    }

    return (
      <div className="space-y-2">
        <p className={`text-red-200/80 ${getTextSize()} max-w-md font-bold`}>{message.primary}</p>
        <p className={`text-red-200/70 ${getTextSize()} max-w-md`}>{message.secondary}</p>
      </div>
    );
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${getVariantClasses()}`}>
      <div className={`${getIconSize()} text-yellow-400 flex items-center justify-center`}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>

      <div className="text-center space-y-2">
        <h3 className={`text-yellow-300 font-semibold ${getTextSize()}`}>
          Serviço temporariamente indisponível
        </h3>
        {renderMessage()}
      </div>

      {showRetryButton && onRetry && (
        <button
          onClick={onRetry}
          className={`
            px-4 py-2 bg-zinc-600 text-white rounded hover:bg-yellow-700 
            transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2
            ${variant === "minimal" ? "text-sm px-3 py-1" : ""}
          `}
        >
          <span className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Tentar novamente</span>
          </span>
        </button>
      )}

      {variant === "default" && (
        <div className="text-center">
          <p className="text-red-200/60 text-xs">
            Se o problema persistir, tente novamente em alguns minutos.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceUnavailable;
