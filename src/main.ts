import { log } from "lib";
import bootstrap from "./bootstrap";

global.log ??= log;

bootstrap();
