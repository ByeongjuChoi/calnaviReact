import React from "react";
import Header from './common/Header';
import Footer from "./common/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-layout">
        <Header />
        <main>{children}</main>
        <Footer />
    </div>
  );
}