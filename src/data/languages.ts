import { Language } from "../types";

export const languages: Language[] = [
  {
    code: "ja",
    name: "Japonês",
    icon: "⛩",
    atmosphere: "Neo Tokyo Bloom",
    description: "Domine hiragana, frases do cotidiano e leitura inicial.",
    units: [
      {
        id: "ja-foundations",
        title: "Fundamentos",
        summary: "Comece com hiragana, saudações e números básicos.",
        lessons: [
          {
            id: "ja-hiragana",
            title: "Hiragana Base",
            subtitle: "Vogais e sons iniciais",
            icon: "あ",
            accent: "magenta",
            difficulty: 1,
            xpReward: 120,
            requiredLessonIds: [],
            theory: [
              "Hiragana é um dos alfabetos fonéticos do japonês.",
              "As cinco vogais são a, i, u, e, o.",
              "Comece reconhecendo caracteres frequentes antes de formar palavras."
            ],
            vocabulary: [
              { term: "あ", reading: "a", meaning: "vogal a" },
              { term: "い", reading: "i", meaning: "vogal i" },
              { term: "う", reading: "u", meaning: "vogal u" }
            ],
            phrases: [
              { source: "あい", reading: "ai", meaning: "amor" },
              { source: "うえ", reading: "ue", meaning: "acima" }
            ],
            exercises: [
              {
                id: "ja-h-1",
                type: "translation",
                prompt: "Qual leitura corresponde a あ ?",
                options: [
                  { id: "1", label: "a", isCorrect: true },
                  { id: "2", label: "i", isCorrect: false },
                  { id: "3", label: "u", isCorrect: false },
                  { id: "4", label: "e", isCorrect: false }
                ],
                xp: 20
              },
              {
                id: "ja-h-2",
                type: "listening",
                prompt: "Ouça e escolha o caractere correto",
                audioText: "い",
                options: [
                  { id: "1", label: "い", isCorrect: true },
                  { id: "2", label: "あ", isCorrect: false },
                  { id: "3", label: "う", isCorrect: false }
                ],
                xp: 20
              },
              {
                id: "ja-h-3",
                type: "memory",
                prompt: "Combine caractere e leitura",
                pairs: [
                  { id: "a", label: "あ", pairId: "a-read" },
                  { id: "a-read", label: "a", pairId: "a" },
                  { id: "i", label: "い", pairId: "i-read" },
                  { id: "i-read", label: "i", pairId: "i" }
                ],
                xp: 30
              },
              {
                id: "ja-h-4",
                type: "draw",
                prompt: "Tente desenhar o caractere あ",
                clue: "Siga o fluxo em três traços suaves.",
                content: "あ",
                strokes: ["comece pelo topo", "desça curvando", "feche o gesto final"],
                xp: 20
              },
              {
                id: "ja-h-5",
                type: "speed",
                prompt: "Responda antes do tempo acabar: う significa...",
                seconds: 9,
                options: [
                  { id: "1", label: "u", isCorrect: true },
                  { id: "2", label: "o", isCorrect: false },
                  { id: "3", label: "e", isCorrect: false }
                ],
                xp: 30
              }
            ]
          },
          {
            id: "ja-greetings",
            title: "Saudações",
            subtitle: "Fale com confiança",
            icon: "💬",
            accent: "cyan",
            difficulty: 1,
            xpReward: 140,
            requiredLessonIds: ["ja-hiragana"],
            theory: [
              "Saudações variam conforme contexto e formalidade.",
              "こんにちは é uma forma segura e comum de cumprimento."
            ],
            vocabulary: [
              { term: "こんにちは", reading: "konnichiwa", meaning: "olá / boa tarde" },
              { term: "ありがとう", reading: "arigatou", meaning: "obrigado" },
              { term: "さようなら", reading: "sayounara", meaning: "até logo" }
            ],
            phrases: [
              { source: "こんにちは！", reading: "konnichiwa", meaning: "Olá!" },
              { source: "ありがとう。", reading: "arigatou", meaning: "Obrigado." }
            ],
            exercises: [
              {
                id: "ja-g-1",
                type: "translation",
                prompt: "Escolha o significado de ありがとう",
                options: [
                  { id: "1", label: "Bom dia", isCorrect: false },
                  { id: "2", label: "Obrigado", isCorrect: true },
                  { id: "3", label: "Desculpa", isCorrect: false }
                ],
                xp: 25
              },
              {
                id: "ja-g-2",
                type: "listening",
                prompt: "O que você ouviu?",
                audioText: "こんにちは",
                options: [
                  { id: "1", label: "こんにちは", isCorrect: true },
                  { id: "2", label: "ありがとう", isCorrect: false },
                  { id: "3", label: "さようなら", isCorrect: false }
                ],
                xp: 25
              },
              {
                id: "ja-g-3",
                type: "speed",
                prompt: "Resposta rápida: como se diz 'até logo'?",
                seconds: 8,
                options: [
                  { id: "1", label: "さようなら", isCorrect: true },
                  { id: "2", label: "こんにちは", isCorrect: false },
                  { id: "3", label: "ありがとう", isCorrect: false }
                ],
                xp: 35
              }
            ]
          },
          {
            id: "ja-numbers",
            title: "Números",
            subtitle: "Conte do 1 ao 10",
            icon: "三",
            accent: "lime",
            difficulty: 2,
            xpReward: 160,
            requiredLessonIds: ["ja-greetings"],
            theory: [
              "Números aparecem cedo em conversas do dia a dia.",
              "Associe kanji, leitura e quantidade."
            ],
            vocabulary: [
              { term: "一", reading: "ichi", meaning: "um" },
              { term: "二", reading: "ni", meaning: "dois" },
              { term: "三", reading: "san", meaning: "três" }
            ],
            phrases: [
              { source: "一つ", reading: "hitotsu", meaning: "um item" },
              { source: "三人", reading: "sannin", meaning: "três pessoas" }
            ],
            exercises: [
              {
                id: "ja-n-1",
                type: "translation",
                prompt: "Qual kanji representa 'três'?",
                options: [
                  { id: "1", label: "一", isCorrect: false },
                  { id: "2", label: "二", isCorrect: false },
                  { id: "3", label: "三", isCorrect: true }
                ],
                xp: 25
              },
              {
                id: "ja-n-2",
                type: "draw",
                prompt: "Desenhe o kanji 三",
                content: "三",
                clue: "São três linhas horizontais equilibradas.",
                xp: 30
              },
              {
                id: "ja-n-3",
                type: "memory",
                prompt: "Combine número e significado",
                pairs: [
                  { id: "one", label: "一", pairId: "one-m" },
                  { id: "one-m", label: "um", pairId: "one" },
                  { id: "two", label: "二", pairId: "two-m" },
                  { id: "two-m", label: "dois", pairId: "two" }
                ],
                xp: 35
              }
            ]
          }
        ]
      }
    ]
  },
  {
    code: "zh",
    name: "Chinês",
    icon: "亭",
    atmosphere: "Neon Jade Grid",
    description: "Aprenda hanzi, pinyin, tons e frases essenciais.",
    units: [
      {
        id: "zh-foundations",
        title: "Fundamentos",
        summary: "Pinyin, tons, saudações e números iniciais.",
        lessons: [
          {
            id: "zh-pinyin",
            title: "Pinyin e Tons",
            subtitle: "Base de leitura",
            icon: "音",
            accent: "lime",
            difficulty: 1,
            xpReward: 120,
            requiredLessonIds: [],
            theory: [
              "Pinyin ajuda a ler sons do mandarim com alfabeto latino.",
              "Os tons mudam o significado das palavras."
            ],
            vocabulary: [
              { term: "mā", reading: "mā", meaning: "mãe" },
              { term: "má", reading: "má", meaning: "cânhamo" },
              { term: "mǎ", reading: "mǎ", meaning: "cavalo" }
            ],
            phrases: [
              { source: "你好", reading: "nǐ hǎo", meaning: "olá" }
            ],
            exercises: [
              {
                id: "zh-p-1",
                type: "translation",
                prompt: "Pinyin com terceiro tom para 'cavalo' é...",
                options: [
                  { id: "1", label: "mā", isCorrect: false },
                  { id: "2", label: "mǎ", isCorrect: true },
                  { id: "3", label: "mà", isCorrect: false }
                ],
                xp: 20
              },
              {
                id: "zh-p-2",
                type: "listening",
                prompt: "Ouça e escolha a palavra",
                audioText: "你好",
                options: [
                  { id: "1", label: "你好", isCorrect: true },
                  { id: "2", label: "谢谢", isCorrect: false },
                  { id: "3", label: "再见", isCorrect: false }
                ],
                xp: 25
              },
              {
                id: "zh-p-3",
                type: "speed",
                prompt: "Responda rápido: 你好 significa...",
                seconds: 8,
                options: [
                  { id: "1", label: "Olá", isCorrect: true },
                  { id: "2", label: "Obrigado", isCorrect: false },
                  { id: "3", label: "Boa noite", isCorrect: false }
                ],
                xp: 30
              }
            ]
          },
          {
            id: "zh-greetings",
            title: "Saudações",
            subtitle: "Use frases do cotidiano",
            icon: "你",
            accent: "cyan",
            difficulty: 1,
            xpReward: 140,
            requiredLessonIds: ["zh-pinyin"],
            theory: [
              "你好 é uma saudação neutra e muito útil.",
              "谢谢 expressa gratidão de forma direta."
            ],
            vocabulary: [
              { term: "你好", reading: "nǐ hǎo", meaning: "olá" },
              { term: "谢谢", reading: "xiè xie", meaning: "obrigado" },
              { term: "再见", reading: "zài jiàn", meaning: "tchau" }
            ],
            phrases: [
              { source: "谢谢你", reading: "xiè xie nǐ", meaning: "obrigado a você" }
            ],
            exercises: [
              {
                id: "zh-g-1",
                type: "translation",
                prompt: "Escolha o significado de 再见",
                options: [
                  { id: "1", label: "Obrigado", isCorrect: false },
                  { id: "2", label: "Até logo", isCorrect: true },
                  { id: "3", label: "De nada", isCorrect: false }
                ],
                xp: 25
              },
              {
                id: "zh-g-2",
                type: "memory",
                prompt: "Combine palavra e significado",
                pairs: [
                  { id: "hello", label: "你好", pairId: "hello-m" },
                  { id: "hello-m", label: "olá", pairId: "hello" },
                  { id: "thanks", label: "谢谢", pairId: "thanks-m" },
                  { id: "thanks-m", label: "obrigado", pairId: "thanks" }
                ],
                xp: 30
              },
              {
                id: "zh-g-3",
                type: "draw",
                prompt: "Desenhe o hanzi 你",
                content: "你",
                clue: "Pratique o equilíbrio entre radical e fonética.",
                xp: 35
              }
            ]
          },
          {
            id: "zh-numbers",
            title: "Números",
            subtitle: "Conte em mandarim",
            icon: "五",
            accent: "gold",
            difficulty: 2,
            xpReward: 160,
            requiredLessonIds: ["zh-greetings"],
            theory: [
              "Números aparecem em preços, horários e quantidades.",
              "Ligue hanzi, pinyin e som."
            ],
            vocabulary: [
              { term: "一", reading: "yī", meaning: "um" },
              { term: "二", reading: "èr", meaning: "dois" },
              { term: "五", reading: "wǔ", meaning: "cinco" }
            ],
            phrases: [
              { source: "五个", reading: "wǔ ge", meaning: "cinco unidades" }
            ],
            exercises: [
              {
                id: "zh-n-1",
                type: "translation",
                prompt: "Qual leitura corresponde a 五 ?",
                options: [
                  { id: "1", label: "wǔ", isCorrect: true },
                  { id: "2", label: "èr", isCorrect: false },
                  { id: "3", label: "yī", isCorrect: false }
                ],
                xp: 25
              },
              {
                id: "zh-n-2",
                type: "listening",
                prompt: "Ouça o número e escolha o hanzi",
                audioText: "二",
                options: [
                  { id: "1", label: "一", isCorrect: false },
                  { id: "2", label: "二", isCorrect: true },
                  { id: "3", label: "五", isCorrect: false }
                ],
                xp: 25
              },
              {
                id: "zh-n-3",
                type: "speed",
                prompt: "Antes do tempo acabar: 二 significa...",
                seconds: 7,
                options: [
                  { id: "1", label: "dois", isCorrect: true },
                  { id: "2", label: "um", isCorrect: false },
                  { id: "3", label: "cinco", isCorrect: false }
                ],
                xp: 35
              }
            ]
          }
        ]
      }
    ]
  }
];
