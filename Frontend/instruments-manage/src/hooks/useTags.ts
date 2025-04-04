import { TABLE_METADATA } from "@/const/table-metadata.const";
import { TableData } from "@/context/TableContext";
import { useTagsState } from "@/states/queries/useTagState";
import { useMemo } from "react";
import { CreateTagDTO, UpdateTagsDTO } from "@/models";

/**
 * Custom hook for managing tags in the application
 *
 * This hook provides functionality to:
 * - Get the list of tags
 * - Add new tags
 * - Update existing tags
 * - Delete tags
 *
 * @returns {Object} An object with the following properties:
 *   - tags: Array<TagsDomain> - List of tags
 *   - addTag: (tag: TagsDomain) => Promise<void> - Function to add a tag
 *   - updateTag: (tag: TagsDomain) => Promise<void> - Function to update a tag
 *   - deleteTag: (id: string) => Promise<void> - Function to delete a tag
 */
export const useTags = () => {
  const { tagQuery, createTagMutation, updateTagMutation, deleteTagMutation } =
    useTagsState();
  const { tags } = tagQuery();

  /**
   * Generates the table format for displaying tag data.
   *
   * @returns {TableData} Table structure object containing:
   *   - headers: Array of column headers with 'key' and 'value' for each column
   *   - rows: Array of objects representing each row with the following tag data:
   *     - tag: Tag identifier
   *     - description: Tag description
   *     - instruments: Instrument model associated with the tag
   *     - alarms: Formatted string with alarm levels (hh, h, l, l)
   *     - typeUnit: Unit type
   *     - unitProcess: Process unit name
   *     - shutDown: Shutdown status
   *
   * @remarks
   * The function uses a side effect (useEffect) to update the table format
   * whenever the tags array changes. The alarms are formatted as a multi-line
   * string containing all alarm levels.
   *
   * @example
   * ```typescript
   * const { getFormatTable } = useTags();
   * const tableFormat = getFormatTable();
   * // Returns:
   * // {
   * //   headers: [{ key: "name", value: "Campo" }],
   * //   rows: [{
   * //     tag: "TAG-001",
   * //     description: "Temperature Sensor",
   * //     instruments: "Model XYZ",
   * //     alarms: "90\n80\n20\n10",
   * //     typeUnit: "Temperature",
   * //     unitProcess: "Process A",
   * //     shutDown: false
   * //   }]
   * // }
   * ```
   */
  const getFormatTable = useMemo((): TableData => {
    return {
      tableMetadata: TABLE_METADATA.tags,
      columns: [
        {
          accessorKey: "tag",
          header: "Tag",
        },
        {
          accessorKey: "description",
          header: "Descripción",
        },
        {
          accessorKey: "instruments",
          header: "Instrumento",
        },
        {
          accessorKey: "alarms",
          header: "Alarmas",
        },
        {
          accessorKey: "typeUnit",
          header: "Unidad de Medición",
        },
        {
          accessorKey: "unitProcess",
          header: "Unidad del Proceso",
        },
        {
          accessorKey: "shutDown",
          header: "¿Detiene el Proceso?",
        },
      ],
      data: tags.map(
        ({
          tag,
          description,
          instrument,
          alarms,
          typeUnit,
          unitProcess,
          shutDown,
        }) => {
          return {
            tag,
            description,
            instruments: instrument.model,
            alarms: `${alarms.hh}\n${alarms.h}\n${alarms.l}\n${alarms.l}`,
            typeUnit,
            unitProcess: unitProcess.name,
            shutDown: `${shutDown}`,
          };
        }
      ),
      messageEmpty: "No se encontraron tags registradas",
    };
  }, [tags]);

  /**
   * Adds a new tag
   * @param tag - The tag to add
   */
  const createTag = async (tag: CreateTagDTO) => {
    try {
      const { mutate } = createTagMutation;
      mutate(tag);
      console.log(tag);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Updates an existing tag
   * @param tag - The tag with updated data
   */
  const updateTag = async (tag: UpdateTagsDTO) => {
    try {
      const { mutate } = updateTagMutation;
      mutate(tag);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Deletes a tag by its ID
   * @param id - The ID of the tag to delete
   */
  const deleteTag = async (id: string) => {
    try {
      const { mutate } = deleteTagMutation;
      mutate(id);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tagsState: tagQuery(),
    getFormatTable,
    createTag,
    updateTag,
    deleteTag,
  };
};
