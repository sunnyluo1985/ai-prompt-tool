<description>完善类型定义，显式声明 process 变量，确保 IDE 和编译器都能正确识别。</description>
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