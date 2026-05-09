import "./globals.css";
import type { Metadata } from "next";
import { ExpenseProvider } from "@/context/expense-context";

export const metadata: Metadata = {
  title: "报销合规助手",
  description: "一个用于整理票据和展示推荐结果的前端练习项目",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <ExpenseProvider>{children}</ExpenseProvider>
      </body>
    </html>
  );
}