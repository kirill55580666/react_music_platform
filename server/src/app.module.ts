import {Module} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TrackModule } from './track/track.module';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join, resolve } from "path";

@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: resolve(__dirname, 'static'),
      }),
      TrackModule,
      MongooseModule.forRoot('mongodb+srv://root:root@cluster0.zuernmi.mongodb.net/?retryWrites=true&w=majority'),
      FileModule
  ],
  providers: [FileService]
})
export class AppModule {

}