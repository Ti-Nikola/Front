import { Timeline } from '@/components/example/Timeline';

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = [
    {
      title: '2024',
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Built and launched Aceternity UI and Aceternity UI Pro from scratch
          </p>
          <div className="grid grid-cols-2 gap-4">
            <p></p>
          </div>
        </div>
      ),
    },
    {
      title: 'Early 2023',
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            I usually run out of copy, but when I see content this big, I try to integrate lorem
            ipsum.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some
            more example of beautiful designs I built.
          </p>
          <div className="grid grid-cols-2 gap-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet dui vel
            vefringilla at, vehicula sed arcu. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Etiam eu luctus justo. Aliquam placerat
            convallis nisl, sed semper arcu scelerisque eget. Donec at leo scelerisque, convallis
            odio quis, pharetra ex. Duis at laoreet lectus. Cras ut sem ac tortor commodo viverra.
            Curabitur accumsan nulla mauris, sollicitudin placerat enim accumsan eget. Vestibulum
            vestibulum sodales mi, id dictum sem sodales ac. Aenean et arcu mollis, tempus dolor at,
            tincidunt elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Donec dictum tellus sed lacinia vulputate. Proin eleifend, ex sed
            sagittis sagittis, enim ex fringilla libero, in malesuada lacus nunc ornare neque. Nunc
            commodo non ipsum ornare luctus. Pellentesque eu nulla odio.
          </div>
        </div>
      ),
    },
    {
      title: 'Changelog',
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
            Deployed 5 new components on Aceternity today
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Card grid component
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Startup template Aceternity
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Random file upload lol
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Himesh Reshammiya Music CD
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300 md:text-sm">
              ✅ Salman Bhai Fan Club registrations open Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Etiam sit amet dui vel vefringilla at, vehicula sed arcu. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
              Etiam eu luctus justo. Aliquam placerat convallis nisl, sed semper arcu scelerisque
              eget. Donec at leo scelerisque, convallis odio quis, pharetra ex. Duis at laoreet
              lectus. Cras ut sem ac tortor commodo viverra. Curabitur accumsan nulla mauris,
              sollicitudin placerat enim accumsan eget. Vestibulum vestibulum sodales mi, id dictum
              sem sodales ac. Aenean et arcu mollis, tempus dolor at, tincidunt elit. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
              dictum tellus sed lacinia vulputate. Proin eleifend, ex sed sagittis sagittis, enim ex
              fringilla libero, in malesuada lacus nunc ornare neque. Nunc commodo non ipsum ornare
              luctus. Pellentesque eu nulla odio.Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Etiam sit amet dui vel vefringilla at, vehicula sed arcu. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam eu
              luctus justo. Aliquam placerat convallis nisl, sed semper arcu scelerisque eget. Donec
              at leo scelerisque, convallis odio quis, pharetra ex. Duis at laoreet lectus. Cras ut
              sem ac tortor commodo viverra. Curabitur accumsan nulla mauris, sollicitudin placerat
              enim accumsan eget. Vestibulum vestibulum sodales mi, id dictum sem sodales ac. Aenean
              et arcu mollis, tempus dolor at, tincidunt elit. Orci varius natoque penatibus et
              magnis dis parturient montes, nascetur ridiculus mus. Donec dictum tellus sed lacinia
              vulputate. Proin eleifend, ex sed sagittis sagittis, enim ex fringilla libero, in
              malesuada lacus nunc ornare neque. Nunc commodo non ipsum ornare luctus. Pellentesque
              eu nulla odio.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet
              dui vel vefringilla at, vehicula sed arcu. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Etiam eu luctus justo. Aliquam
              placerat convallis nisl, sed semper arcu scelerisque eget. Donec at leo scelerisque,
              convallis odio quis, pharetra ex. Duis at laoreet lectus. Cras ut sem ac tortor
              commodo viverra. Curabitur accumsan nulla mauris, sollicitudin placerat enim accumsan
              eget. Vestibulum vestibulum sodales mi, id dictum sem sodales ac. Aenean et arcu
              mollis, tempus dolor at, tincidunt elit. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Donec dictum tellus sed lacinia vulputate.
              Proin eleifend, ex sed sagittis sagittis, enim ex fringilla libero, in malesuada lacus
              nunc ornare neque. Nunc commodo non ipsum ornare luctus. Pellentesque eu nulla odio.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4"></div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
      {children}
    </div>
  );
}
