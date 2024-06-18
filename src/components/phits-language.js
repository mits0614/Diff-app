const phitsLanguage = {
    defaultToken: '',
    tokenPostfix: '.phits',
  
    // キーワードとパターンを設定
    keywords: [
      "maxcas",
      "maxbch",
      "mesh",
      "volumeDefinition",
      "-type",
      "axis",
      "file",
      "title",
      "gshow",
      "epsout",
      "unit=1",
      "unit=2",
      "unit=3",
      "unit=4",
      "unit=11",
      "unit=12",
      "unit=13",
      "unit=14"
    ],
  
    patterns: [
      "\\[\\s*title\\s*\\]",
      "\\[\\s*parameters\\s*\\]",
      "\\[\\s*source\\s*\\]",
      "\\[\\s*material\\s*\\]",
      "\\[\\s*surface\\s*\\]",
      "\\[\\s*cell\\s*\\]",
      "\\[\\s*transform\\s*\\]",
      "\\[\\s*temperature\\s*\\]",
      "\\[\\s*mat\\s*time\\s*change\\s*\\]",
      "\\[\\s*magnetic\\s*field\\s*\\]",
      "\\[\\s*electro\\s*magnetic\\s*field\\s*\\]",
      "\\[\\s*delta\\s*ray\\s*\\]",
      "\\[\\s*track\\s*structure\\s*\\]",
      "\\[\\s*super\\s*mirror\\s*\\]",
      "\\[\\s*elastic\\s*option\\s*\\]",
      "\\[\\s*data\\s*max\\s*\\]",
      "\\[\\s*frag\\s*data\\s*\\]",
      "\\[\\s*importance\\s*\\]",
      "\\[\\s*weight\\s*window\\s*\\]",
      "\\[\\s*ww\\s*bias\\s*\\]",
      "\\[\\s*forced\\s*collisions\\s*\\]",
      "\\[\\s*repeated\\s*collisions\\s*\\]",
      "\\[\\s*volume\\s*\\]",
      "\\[\\s*multiplier\\s*\\]",
      "\\[\\s*mat\\s*name\\s*color\\s*\\]",
      "\\[\\s*reg\\s*name\\s*\\]",
      "\\[\\s*counter\\s*\\]",
      "\\[\\s*timer\\s*\\]",
      "\\[\\s*t-track\\s*\\]",
      "\\[\\s*t-cross\\s*\\]",
      "\\[\\s*t-point\\s*\\]",
      "\\[\\s*t-deposit\\s*\\]",
      "\\[\\s*t-deposit2\\s*\\]",
      "\\[\\s*t-heat\\s*\\]",
      "\\[\\s*t-yield\\s*\\]",
      "\\[\\s*t-product\\s*\\]",
      "\\[\\s*t-dpa\\s*\\]",
      "\\[\\s*t-let\\s*\\]",
      "\\[\\s*t-seed\\s*\\]",
      "\\[\\s*t-time\\s*\\]",
      "\\[\\s*t-interact\\s*\\]",
      "\\[\\s*t-dchain\\s*\\]",
      "\\[\\s*t-wwg\\s*\\]",
      "\\[\\s*t-wwbg\\s*\\]",
      "\\[\\s*t-volume\\s*\\]",
      "\\[\\s*t-userdefined\\s*\\]",
      "\\[\\s*t-gshow\\s*\\]",
      "\\[\\s*t-rshow\\s*\\]",
      "\\[\\s*t-3dshow\\s*\\]",
      "\\[\\s*end\\s*\\]"
    ],
  
    operators: [
      '=', '>', '<', '!', '?', ':', '==', '<=', '>=', '!=', '&&', '||', '++', '--', '+', '-', '*', '/', '&', '|', '^', '%', '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=', '^=', '%=', '<<=', '>>=', '>>>='
    ],
  
    symbols: /[=><!~?:&|+\-*\/^%]+/,
  
    tokenizer: {
      root: [
        [/\[.*?\]/, {
          cases: {
            '@patterns': 'keyword',
            '@default': 'string'
          }
        }],
        [/[a-zA-Z_$][\w$]*/, {
          cases: {
            '@keywords': 'keyword',
            '@default': 'identifier'
          }
        }],
        { include: '@whitespace' },
        [/[{}()\[\]]/, '@brackets'],
        [/@symbols/, {
          cases: {
            '@operators': 'delimiter',
            '@default': ''
          }
        }],
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/\d+/, 'number'],
        [/[;,.]/, 'delimiter'],
        [/"([^"\\]|\\.)*$/, 'string.invalid'],
        [/"/, 'string', '@string']
      ],
  
      whitespace: [
        [/[ \t\r\n]+/, ''],
        [/#.*$/, 'comment']
      ],
  
      string: [
        [/[^\\"]+/, 'string'],
        [/\\./, 'string.escape.invalid'],
        [/"/, 'string', '@pop']
      ]
    }
  };
  
  export default phitsLanguage;
  