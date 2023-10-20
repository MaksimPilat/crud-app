import Header from "./Header";

interface LayoutProps {
  children?: React.ReactNode;
}

const TabsLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="max-w-5xl mx-auto px-4 my-12">{children}</main>
    </>
  );
};

export default TabsLayout;
