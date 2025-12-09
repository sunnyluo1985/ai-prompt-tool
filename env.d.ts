<description>再次确认环境类型定义，确保全局变量声明完整。</description>
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