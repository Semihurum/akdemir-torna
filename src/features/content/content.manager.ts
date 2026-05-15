import { ContentModel, IContent } from "./content.model";
import { dbConnect } from "@/core/db/mongodb";

export class ContentManager {
  async getContent(): Promise<IContent> {
    await dbConnect();
    let content = await ContentModel.findOne();
    if (!content) {
      content = await ContentModel.create({});
    }
    return content;
  }

  async updateContent(data: Partial<IContent>): Promise<IContent> {
    await dbConnect();
    let content = await ContentModel.findOne();
    if (!content) {
      content = await ContentModel.create(data);
    } else {
      content = await ContentModel.findOneAndUpdate({}, data, { new: true });
    }
    return content as IContent;
  }
}

export const contentManager = new ContentManager();
