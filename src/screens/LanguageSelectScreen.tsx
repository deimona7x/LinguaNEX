import { useAppState } from "../context/AppStateContext";
import { Panel } from "../components/Panel";

export function LanguageSelectScreen() {
  const { languages, user, setSelectedLanguage, setActiveScreen } = useAppState();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">Language Bay</p>
        <h2 className="font-display text-4xl text-white">Escolha seu próximo idioma</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {languages.map((language) => (
          <Panel key={language.code} className="rounded-[30px] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div className="text-6xl">{language.icon}</div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-sm uppercase tracking-[0.18em] text-slate-300">
                {language.atmosphere}
              </span>
            </div>
            <h3 className="font-display text-3xl text-white">{language.name}</h3>
            <p className="mt-3 text-xl text-slate-300">{language.description}</p>
            <div className="mt-5 text-lg text-slate-400">
              {language.units.reduce((total, unit) => total + unit.lessons.length, 0)} missões iniciais
            </div>
            <button
              onClick={() => {
                setSelectedLanguage(language.code);
                setActiveScreen("dashboard");
              }}
              className={`mt-6 w-full rounded-2xl border px-4 py-3 text-lg transition ${
                user.selectedLanguage === language.code
                  ? "border-lime-300/40 bg-lime-400/10 text-lime-100"
                  : "border-fuchsia-300/40 bg-fuchsia-500/10 text-white hover:bg-fuchsia-500/20"
              }`}
            >
              {user.selectedLanguage === language.code ? "Idioma ativo" : "Ativar idioma"}
            </button>
          </Panel>
        ))}
      </div>
    </div>
  );
}
