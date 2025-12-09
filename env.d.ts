<description>补充缺失的 process 变量声明，确保 TypeScript 能够正确识别 process.env。</description>
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
</changes>