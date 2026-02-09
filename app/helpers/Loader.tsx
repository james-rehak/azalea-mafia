import Image from 'next/image'

type LoaderProps = {
  loaderKey: number;
};

export default function Loader({ loaderKey }: LoaderProps) {
  const pets = [
    "/pets/archie.png",
    "/pets/harley-bed.png",
    "/pets/cheddar.png",
    "/pets/harley-ahh.png",
    "/pets/clark.png",
    "/pets/cheddar-1.png",
    "/pets/harley-ahh-1.png",
  ];

  const petIndex = loaderKey % pets.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <Image
        width={100}
        height={100}
        className="h-100 w-100 animate-spin"
        src={pets[petIndex]}
        alt="Loading..."/>
    </div>
  );
}
