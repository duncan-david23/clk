/* ------------------------------------------------------------------ */
/*  SETUP GATE                                                         */
/* ------------------------------------------------------------------ */
function SetupGate({ children }) {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setReady(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, []);

  return (
    <>
      <noscript>
        <style>{`.setup-gate{visibility:visible!important}`}</style>
      </noscript>
      <div className={`setup-gate ${ready ? "ready" : ""}`}>
        {children}
      </div>
    </>
  );
}