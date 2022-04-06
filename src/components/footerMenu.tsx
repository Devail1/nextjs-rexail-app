import { useRouter } from "next/router";

const FooterMenu = () => {
  const router = useRouter();

  return (
    <footer className="mobile-hide">
      {router.pathname === "/" ? (
        <div className="big-footer w-full">
          <nav className="container mx-auto"></nav>
        </div>
      ) : (
        ""
      )}
      <div className="desktop-footer px-28 display-flex font-white text-weight-300 align-center justify-between">
        <div className="credits">@ קמעונאי און ליין בע&quot;מ, 2021. כל הזכויות שמורות.</div>
        <div>
          <a href="#">תנאי שימוש</a> &nbsp;|&nbsp; <a href="#">הצהרת נגישות</a>
        </div>
        <img className="c-p" src="/images/logo-powered-by.svg" alt="powered-by" />
      </div>
    </footer>
  );
};

export default FooterMenu;
