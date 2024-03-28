'use client';

import React, { useEffect, useState } from 'react';


import { Input } from '@nextui-org/input';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('@/components/Editor'), { ssr: false });

export default function Home() {

  const [inputHtml, setInputHtml] = useState<string>('');
  const [outHTML, setOutHTML] = useState<string>('');

  const [prefix, setPrefix] = useState<string>('tw-');

  useEffect(() => {
    // 将用户输入的 html 中所有的 class 替换为 tw- 开头的,class 里可能有多个 class
    const classReg = /(className=[{]*["']|class=[{]*["'])([^"']+)(["'][}]*)/g;
    const out = inputHtml.replace(classReg, (match, p1, p2, p3) => {
      const classes = p2.split(' ');
      const newClasses = classes.map((c: string) => {
        if (c.includes(':')) {
          const s = c.split(':');
          return s.map((cc: string, index) => {
            return index == s.length - 1 ? `${prefix}${cc}` : cc;
          }).join(':');
        }
        return `${prefix}${c}`;
      });
      return `${p1}${newClasses.join(' ')}${p3}`;
    });

    setOutHTML(out);


  }, [inputHtml, prefix]);

  return (
    <main className="pb-24 flex min-h-screen flex-col items-center px-2 md:px-24 dark text-foreground bg-background">
      <div
        className="my-10 w-full max-w-5xl  flex flex-col items-center justify-center px-4 text-center leading-8 md:px-0 gap-2 md:gap-6">
        <div
          className={'flex gap-2 md:gap-4 justify-center tracking-tight inline font-medium from-[#FFFFFF] to-[#DCDCDC] text-2xl md:text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-b'}>
          <h1>Batch</h1>
          <h1>Add</h1>
          <h1
            className={'bg-clip-text text-transparent bg-[linear-gradient(20deg,#F63B7D_0%,#F67893_100%)]'}>TailwindCSS</h1>
          <h1
            className={'bg-clip-text text-transparent bg-[linear-gradient(20deg,#8354F6_0%,#9899F6_100%)]'}>Prefix</h1>
        </div>
        <p className="text-gray-400 underline text-sm md:text-medium flex gap-4"><a href={"https://tailwind-prefix.vercel.app"}>https://tailwind-prefix.vercel.app</a> <a href={'https://github.com/small-tou/tailwind-prefixer'}>Github</a></p>
      </div>
      <div className="z-10 max-w-8xl w-full   font-mono text-sm  h-full flex-1 flex flex-col">
        <Input placeholder={'Input prefix string'} label={'Prefix string'} value={prefix} onChange={(e) => {
          setPrefix(e.target.value);
        }} />
        <div className="grid grid-cols-8 gap-4 w-full h-full flex-1 flex flex-col mt-4">
          <div className={'col-span-4  h-full flex flex-col'}>
            <Editor placholder={'Paste your html here'} content={inputHtml} onChange={(e)=>{
              setInputHtml(e);
            }} />

          </div>
          <div className={'col-span-4'}>
            <Editor placholder={''} content={outHTML} />
          </div>

        </div>
      </div>
    </main>
  )
    ;
}
