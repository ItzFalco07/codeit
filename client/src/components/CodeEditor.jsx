import { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useCode } from '../context/code';
import axios from 'axios';
import * as monaco from 'monaco-editor';

const CodeEditor = ({ theme, textSize, Language, Path }) => {
  const { Code, setCode } = useCode();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  let editorOptions = {
    fontSize: textSize,
    quickSuggestions: true,
  };

  let typingTimer
  async function handleCodeChange(value) {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(async () => {
      await axios.post(`${backendUrl}/savecode`, { Code: value, Path: Path });
    }, 2000);
  }

  const HandleSnippets = (monaco) => {
    console.log('handle snippets called');

    // JavaScript Snippets
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: (model, position, context, token) => {
        return {
          suggestions: [
            {
              label: 'forloop',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "for (let ${1:i} = 0; ${1:i} < 10; ${1:i}++) {\n\t$0\n}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a for loop',
              sortText: '0000_forloop',
              filterText: 'for',
            },
            {
              label: 'console',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "console.log($0);",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a console log',
              sortText: '0001_console',
              filterText: 'console',
            },
            {
              label: 'function',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "function ${1:functionName}() {\n\t$0\n}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a function definition',
              sortText: '0002_function',
              filterText: 'function',
            },
            {
              label: 'setTimeout',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "setTimeout(() => {\n\t$0\n}, 1000);",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a setTimeout function',
              sortText: '0003_setTimeout',
              filterText: 'setTimeout',
            },
            {
              label: 'ifelse',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "if (${1:condition}) {\n\t$0\n} else {\n\t$2\n}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an if-else statement',
              sortText: '0004_ifelse',
              filterText: 'ifelse',
            },
            {
              label: 'whileloop',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "while (${1:condition}) {\n\t$0\n}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a while loop',
              sortText: '0005_whileloop',
              filterText: 'whileloop',
            },
            {
              label: 'forin',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "for (let ${1:key} in ${2:object}) {\n\t$0\n}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a for-in loop for objects',
              sortText: '0006_forin',
              filterText: 'forin',
            },
            {
              label: 'arrowfunction',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "const ${1:functionName} = (${2:params}) => {\n\t$0\n};",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an arrow function',
              sortText: '0007_arrowfunction',
              filterText: 'arrowfunction',
            },
            {
              label: 'trycatch',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "try {\n\t$0\n} catch (${1:error}) {\n\t$2\n}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a try-catch block',
              sortText: '0008_trycatch',
              filterText: 'trycatch',
            },
            {
              label: 'class',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "class ${1:ClassName} {\n\tconstructor(${2:params}) {\n\t\t$0\n\t}\n}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a class definition',
              sortText: '0009_class',
              filterText: 'class',
            },
            {
              label: 'import',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "import ${1:*} from '${2:module}';",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an import statement',
              sortText: '0010_import',
              filterText: 'import',
            },
            {
              label: 'asyncfunction',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "async function ${1:functionName}(${2:params}) {\n\t$0\n}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an async function',
              sortText: '0011_asyncfunction',
              filterText: 'asyncfunction',
            },
            {
              label: 'promise',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "new Promise((resolve, reject) => {\n\t$0\n});",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a promise structure',
              sortText: '0012_promise',
              filterText: 'promise',
            },
            {
              label: 'fetch',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "fetch('${1:url}', {\n\tmethod: '${2:GET}',\n\theaders: {\n\t\t'Content-Type': 'application/json',\n\t},\n})\n.then(response => response.json())\n.then(data => {\n\t$0\n});",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a fetch API call',
              sortText: '0013_fetch',
              filterText: 'fetch',
            },
            {
              label: 'setInterval',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "setInterval(() => {\n\t$0\n}, ${1:1000});",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a setInterval function',
              sortText: '0014_setInterval',
              filterText: 'setInterval',
            },
            {
              label: 'localStorage',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "localStorage.setItem('${1:key}', '${2:value}');\n${3:// retrieve it with localStorage.getItem('${1:key}')}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert localStorage API usage',
              sortText: '0015_localStorage',
              filterText: 'localStorage',
            },
          ],
        };
      },
    });


    // Python Snippets
    monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: (model, position, context, token) => {
        return {
          suggestions: [
            {
              label: 'for',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "for ${1:variable} in ${2:iterable}:\n\t$0",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a Python for loop',
              sortText: '0000_for',
              filterText: 'for',
            },
            {
              label: 'if',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "if ${1:condition}:\n\t$0",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an if condition',
              sortText: '0001_if',
              filterText: 'if',
            },
            {
              label: 'function',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "def ${1:function_name}():\n\t$0",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a Python function definition',
              sortText: '0002_function',
              filterText: 'def',
            },
            {
              label: 'print',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "print(${1:message})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a Python print statement',
              sortText: '0003_print',
              filterText: 'print',
            },
            {
              label: 'if else',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'if ${1:condition}:\n\t${2:pass}\nelse:\n\t$0',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Python if else statement',
              sortText: '0004_ifelse',
              filterText: 'ifelse',      
            },
            {
              label: 'while',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "while ${1:condition}:\n\t$0",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a Python while loop',
              sortText: '0005_while',
              filterText: 'while',
            },
            {
              label: 'try except',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "try:\n\t$0\nexcept ${1:Exception} as ${2:e}:\n\t${3:print(e)}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a try-except block',
              sortText: '0006_tryexcept',
              filterText: 'tryexcept',
            },
            {
              label: 'class',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "class ${1:ClassName}(${2:object}):\n\tdef __init__(self, ${3:args}):\n\t\t$0",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a Python class with constructor',
              sortText: '0007_class',
              filterText: 'class',
            },
            {
              label: 'import',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "import ${1:module}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an import statement',
              sortText: '0008_import',
              filterText: 'import',
            },
            {
              label: 'lambda',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "lambda ${1:args}: ${2:expression}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a lambda function',
              sortText: '0009_lambda',
              filterText: 'lambda',
            },
            {
              label: 'list comprehension',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "[${1:item} for ${1:var} in ${2:iterable}]",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a list comprehension',
              sortText: '0010_listcomp',
              filterText: 'listcomp',
            },
            {
              label: 'with open',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "with open(${1:'filename'}, '${2:r}') as ${3:file}:\n\t$0",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Open a file with context manager',
              sortText: '0011_withopen',
              filterText: 'withopen',
            },
            {
              label: 'enumerate',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "for ${1:index}, ${2:item} in enumerate(${3:iterable}):\n\t$0",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Iterate with index using enumerate',
              sortText: '0012_enumerate',
              filterText: 'enumerate',
            },
            {
              label: 'range',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "range(${1:start}, ${2:end}, ${3:step})",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert range function',
              sortText: '0013_range',
              filterText: 'range',
            },
            {
              label: 'assert',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "assert ${1:expression}, ${2:'message'}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an assert statement',
              sortText: '0014_assert',
              filterText: 'assert',
            },
            {
              label: 'return',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: "return ${1:value}",
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a return statement',
              sortText: '0015_return',
              filterText: 'return',
            },
          ],
        };
      },
    });

    // HTML Snippets
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: (model, position, context, token) => {
        return {
          suggestions: [
            {
              label: 'div',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<div>\n\t$0\n</div>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a div element',
              sortText: '0000_div',
              filterText: 'div',
            },
            {
              label: 'p',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<p>$0</p>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a paragraph element',
              sortText: '0001_p',
              filterText: 'p',
            },
            {
              label: 'h1',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<h1>$0</h1>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an h1 element',
              sortText: '0002_h1',
              filterText: 'h1',
            },
            {
              label: 'img',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<img src="$0" />`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an img element',
              sortText: '0003_img',
              filterText: 'img',
            },
            {
              label: 'class',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `class="$0"`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a class attribute',
              sortText: '0004_class',
              filterText: 'class',
            },
            {
              label: 'id',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `id="$0"`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert an id attribute',
              sortText: '0005_id',
              filterText: 'id',
            },
            {
              label: 'button',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<button>$0</button>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a button element',
              sortText: '0006_button',
              filterText: 'button',
            },
            {

              label: 'html boilerplate',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 
  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      $0
  </body>
  </html>
  `,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a basic HTML boilerplate',
              sortText: '0007_boilerplate',
              filterText: 'html boilerplate',
            },
            {
              label: 'src',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `src="$0"`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a src attribute',
              sortText: '0008_src',
              filterText: 'src',
            },
            {
              label: 'head',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<head>\n\t$0\n</head>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a head element',
              sortText: '0009_head',
              filterText: 'head',
            },
            {
              label: 'body',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<body>\n\t$0\n</body>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a body element',
              sortText: '0010_body',
              filterText: 'body',
            },
            {
              label: 'title',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<title>$0</title>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a title element',
              sortText: '0011_title',
              filterText: 'title',
            },
            {
              label: 'link:stylesheet',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<link rel="stylesheet" href="$0" />`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a link to a stylesheet',
              sortText: '0012_link_stylesheet',
              filterText: 'link',
            },
            {
              label: 'link:favicon',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<link rel="icon" href="$0" />`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a link to a favicon',
              sortText: '0013_link_favicon',
              filterText: 'favicon',
            },
            {
              label: 'script',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<script src="$0"></script>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a script element',
              sortText: '0014_script',
              filterText: 'script',
            },
            {
              label: 'span',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: `<span>$0</span>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Insert a span element',
              sortText: '0015_span',
              filterText: 'span',
            },
          ],
        };
      },
    });
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Editor
        height="100%"
        width="100%"
        theme={theme}
        language={Language}
        options={editorOptions}
        value={Code}
        onChange={handleCodeChange}
        onMount={(editor, monaco) => {
          HandleSnippets(monaco); // Register snippets after editor is loaded and Monaco is available
        }}
      />
    </div>
  );
};

export default CodeEditor;
