for file in ../cards/*.js
do
	iconv -f windows-1252 -t utf-8 "$file" > "$file.new" &&
	mv -f "$file.new" "$file"
done
