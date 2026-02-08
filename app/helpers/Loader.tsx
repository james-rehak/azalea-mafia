type LoaderProps = {
  loaderKey: number;
};

export default function Loader({ loaderKey }: LoaderProps) {
  const pets = [
    "/pets/archie.png",
    "/pets/cheddar.png",
    // TODO Clark, Harley, JB
    ];

  const petIndex = loaderKey % pets.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-amber-600/40">
      <img className="h-100 w-100 animate-spin" src={pets[petIndex]} alt="Loading..." />
    </div>
  );
}
