import Header from "../components/layout-component/Header";
import useWindowUtils from "../utils/useWindowUtils";

const MainLayout = ({ children }) => {
  const { screenWidth } = useWindowUtils();
  const screenLG = screenWidth < 992;
  return (
    <>
      {screenLG ? <Header /> : <Header />}
      <main className="main-layout">
        <section className={`main-section`}>
          <main className="px-4 sm:px-6 lg:px-8 py-4 main-content-area">
            {children}
          </main>
        </section>
      </main>
    </>
  );
};

export default MainLayout;
