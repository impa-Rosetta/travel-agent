export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <section className="max-w-2xl text-center">
        <p className="text-sm font-medium text-zinc-500">
          Stage 1 - Frontend Initialization
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">
          AI Travel Agent
        </h1>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          前端工程已初始化。当前只包含 Next.js、React、TypeScript 和
          Tailwind CSS 基础配置，暂不包含旅游业务功能。
        </p>
      </section>
    </main>
  );
}
