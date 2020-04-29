import {PasteInput} from "../graphql.schema.generated";
import {IsBoolean, IsIn, IsInt, IsOptional, IsString, Length} from "class-validator";
import {Trim, Whitelist} from "class-sanitizer";
import {Blacklist} from "../blacklist.decorator";

export class PasteInputDto extends PasteInput {
    @IsOptional()
    @IsInt()
    expiresAfter: number;

    @Trim()
    @IsString()
    @IsOptional()
    @IsIn(["abap", "abnf", "actionscript", "ada", "apacheconf", "apl", "applescript", "arduino", "arff", "asciidoc", "asm6502", "aspnet", "autohotkey", "autoit", "bash", "basic", "batch", "bison", "bnf", "brainfuck", "bro", "c", "cil", "clike", "clojure", "cmake", "coffeescript", "cpp", "crystal", "csharp", "csp", "css-extras", "css", "d", "dart", "diff", "django", "dns-zone-file", "docker", "ebnf", "eiffel", "ejs", "elixir", "elm", "erb", "erlang", "flow", "fortran", "fsharp", "gcode", "gedcom", "gherkin", "git", "glsl", "gml", "go", "graphql", "groovy", "haml", "handlebars", "haskell", "haxe", "hcl", "hpkp", "hsts", "http", "ichigojam", "icon", "inform7", "ini", "io", "j", "java", "javadoc", "javadoclike", "javascript", "javastacktrace", "jolie", "jq", "js-extras", "js-templates", "jsdoc", "json", "json5", "jsonp", "jsx", "julia", "keyman", "kotlin", "latex", "less", "lilypond", "liquid", "lisp", "livescript", "lolcode", "lua", "makefile", "markdown", "markup-templating", "markup", "matlab", "mel", "mizar", "monkey", "n1ql", "n4js", "nand2tetris-hdl", "nasm", "nginx", "nim", "nix", "nsis", "objectivec", "ocaml", "opencl", "oz", "parigp", "parser", "pascal", "pascaligo", "pcaxis", "perl", "php-extras", "php", "phpdoc", "plsql", "powershell", "processing", "prolog", "properties", "protobuf", "pug", "puppet", "pure", "python", "q", "qore", "r", "reason", "regex", "renpy", "rest", "rip", "roboconf", "ruby", "rust", "sas", "sass", "scala", "scheme", "scss", "shell-session", "smalltalk", "smarty", "soy", "splunk-spl", "sql", "stylus", "swift", "t4-cs", "t4-templating", "t4-vb", "tap", "tcl", "textile", "toml", "tsx", "tt2", "twig", "typescript", "vala", "vbnet", "velocity", "verilog", "vhdl", "vim", "visual-basic", "wasm", "wiki", "xeora", "xojo", "xquery", "yaml"])
    language: string;

    @Trim()
    @IsString()
    @Length(1, 4096) // 500MB allows to store around 61k of such pastes
    text: string;

    @Trim()
    @Blacklist(/[^\w-]/i)
    @IsOptional()
    @IsString()
    @Length(4, 128)
    url: string;

    @IsOptional()
    @IsBoolean()
    isPublic: boolean;

    @Trim()
    @IsOptional()
    @IsString()
    @Length(1, 128)
    title: string;
}