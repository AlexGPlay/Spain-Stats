import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";
import useLayerSearch from "@/hooks/useLayerSearch";
import Flex from "./Flex";

export default function LayerSearch({
  isOpen,
  onOpenChange,
  onLayerSelected,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onLayerSelected: (layer: string) => void;
}) {
  const [searchText, setSearchText] = useState("");
  const { results: foundLayers } = useLayerSearch(searchText);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  return (
    <CommandDialog open={isOpen} onOpenChange={onOpenChange}>
      <Command shouldFilter={false}>
        <CommandInput
          value={searchText}
          onValueChange={(value) => setSearchText(value)}
          placeholder="Busca una provicina o municipio..."
        />
        <CommandList>
          <CommandEmpty>No se encuentran resultados</CommandEmpty>
          <CommandGroup>
            {foundLayers.map((layer) => (
              <CommandItem
                onSelect={() => onLayerSelected(layer.id)}
                value={layer.id.toString()}
                key={layer.id}
              >
                <Flex className="w-full">
                  {layer.name}
                  <div className="ml-auto text-slate-500 text-xs">
                    {layer.type}
                  </div>
                </Flex>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
