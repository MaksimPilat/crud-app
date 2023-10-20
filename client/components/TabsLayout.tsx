import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Link from "next/link";

interface LayoutProps {
  children?: React.ReactNode;
}

interface ITab {
  name: string;
  path: string;
}

const tabs: ITab[] = [
  {
    name: "Equipments",
    path: "/",
  },
  {
    name: "Areas",
    path: "/areas",
  },
  {
    name: "Employees",
    path: "/employees",
  },
];

const TabsLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    const currentTabIndex = tabs.findIndex((tab) => tab.path === router.pathname);
    if (currentTabIndex !== -1) {
      setActiveTab(currentTabIndex);
    }
  }, [router.pathname]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="max-w-5xl mx-auto px-4 my-12">
        <div className="tabs">
          {tabs.map((tab: ITab, index) => (
            <Link
              href={tab.path}
              key={index}
              className={`tab tab-lifted ${activeTab === index && "tab-active"}`}
              onClick={() => handleTabClick(index)}
            >
              {tab.name}
            </Link>
          ))}
        </div>
        {children}
      </main>
    </>
  );
};

export default TabsLayout;
