import React, { useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/display/placeholder';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/xml/xml';

export default function Editor(props: {
  placholder: string
  content: string
  onChange?: (content: string) => void
}) {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const codemirrorEditor = React.useRef<any>(null);

  useEffect(() => {
    if (inputRef.current && !codemirrorEditor.current) {
      codemirrorEditor.current = CodeMirror.fromTextArea(inputRef.current, {
        lineNumbers: true,
        mode: 'xml',
        theme: 'dracula',
        lineWrapping: true,
        tabSize: 2,
        indentUnit: 2,
        smartIndent: true,
        placeholder: props.placholder,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      });

      codemirrorEditor.current.on('change', (cm: any) => {
        const code = cm.getValue();
        props.onChange?.(code);
      });
    }
  }, [inputRef]);

  useEffect(() => {
    if (codemirrorEditor.current) {
      codemirrorEditor.current.setValue(props.content);
    }
  }, [props.content]);
  return <textarea
    ref={inputRef}
    className={'w-full h-full p-4 bg-gray-800 text-white'}
  />;
}