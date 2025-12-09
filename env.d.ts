Updated files:
env.d.ts
<description>修正文件内容为真正的 TypeScript 类型声明，替换掉错误的中文描述。</description>
<content><![CDATA[/// <reference types="vite/client" />
declare namespace NodeJS {
interface ProcessEnv {
readonly API_KEY: string;
readonly VITE_API_KEY: string;
[key: string]: string | undefined;
}
}
declare var process: {
env: NodeJS.ProcessEnv;
};
]]></content>