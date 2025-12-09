<description>补全 env.d.ts，显式声明全局 process 变量，这是修复 TypeScript 报错的最后一块拼图。</description>
<content><![CDATA[/// <reference types="vite/client" />
declare namespace NodeJS {
interface ProcessEnv {
readonly API_KEY: string;
readonly VITE_API_KEY: string;
[key: string]: string | undefined;
}
}
// 必须显式声明这个全局变量，否则 geminiService.ts 会报错
declare var process: {
env: NodeJS.ProcessEnv;
};
]]></content>