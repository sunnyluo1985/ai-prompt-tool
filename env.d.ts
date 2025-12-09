<description>补全 env.d.ts，增加对 global process 变量的显式声明，防止运行时可能出现的“process is not defined”错误。</description>
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