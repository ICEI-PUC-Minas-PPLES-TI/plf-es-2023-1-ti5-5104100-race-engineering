import Header from "../home/Header";
import Logo from "../home/footer";

export default function Home() {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 5" },
    { id: 6, name: "Item 6" },
    { id: 7, name: "Item 7" },
    { id: 8, name: "Item 8" },
    { id: 9, name: "Item 9" },
  ];

  const renderItems = () => {
    const rows = [];

    for (let i = 0; i < items.length; i += 3) {
      const row = (
        <div key={i} className="row">
          {items.slice(i, i + 3).map((item) => (
            <div key={item.id} className="col">
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      );
      rows.push(row);
    }

    return rows;
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="row">{renderItems()}</div>
      </div>

      <Logo />
    </>
  );
}