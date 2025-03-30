import type { CollectionConfig } from 'payload';
import slug from 'slug';

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            if (data?.title) {
              return slug(data.title, { lower: true });
            }
            return undefined;
          },
        ],
      },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
};

export default Projects;
