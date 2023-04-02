import * as Avatar from "@radix-ui/react-avatar";

interface AvatarProps {
  url?: string;
  iniciais: string
}

export function AvatarDemo(props: AvatarProps) {


   function avatar(nome: string | undefined) {
     if (nome === undefined) {
       return "Erro";
     }

     const palavras = nome.split(" ");

     palavras[0] = palavras[0].substring(0, 1);
     palavras[palavras.length - 1] = palavras[palavras.length - 1].substring(
       0,
       1
     );

     return palavras[0] + palavras[palavras.length - 1];
   }


  return (
    <div>
      <Avatar.Root className="flex justify-center  bg-gray-300 items-center w-10 h-10 rounded-[100%] border-gray-500 border ">
        <Avatar.Image
          className="w-fll h-full rounded-[inherit] "
          src={props.url}
        />
        <Avatar.Fallback className="text-gray-600 AvatarFallback">
          {avatar(props.iniciais)}
        </Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}
