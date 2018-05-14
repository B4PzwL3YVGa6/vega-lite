import embed from 'vega-embed';
export function runStreamingExample(eleId) {
    var vlSpec = {
        $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
        data: { name: 'table' },
        autosize: {
            resize: true
        },
        width: 400,
        mark: 'line',
        encoding: {
            x: { field: 'x', type: 'quantitative', scale: { zero: false } },
            y: { field: 'y', type: 'quantitative' },
            color: { field: 'category', type: 'nominal' }
        }
    };
    embed(eleId, vlSpec, {
        actions: false
    }).then(function (res) {
        var view = res.view;
        /**
         * Generates a new tuple with random walk.
         */
        function newGenerator() {
            var counter = -1;
            var previousY = [5, 5, 5, 5];
            return function () {
                counter++;
                var newVals = previousY.map(function (v, category) { return ({
                    x: counter,
                    y: v + Math.round(Math.random() * 10 - category * 3),
                    category: category
                }); });
                previousY = newVals.map(function (v) { return v.y; });
                return newVals;
            };
        }
        var valueGenerator = newGenerator();
        var minimumX = -100;
        window.setInterval(function () {
            minimumX++;
            var changeSet = view.changeset()
                .insert(valueGenerator())
                .remove(function (t) { return t.x < minimumX; });
            view.change('table', changeSet).run();
        }, 1000);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc2l0ZS9zdGF0aWMvc3RyZWFtaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxNQUFNLFlBQVksQ0FBQztBQUkvQixNQUFNLDhCQUE4QixLQUFhO0lBQy9DLElBQU0sTUFBTSxHQUFpQjtRQUMzQixPQUFPLEVBQUUsaURBQWlEO1FBQzFELElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUM7UUFDckIsUUFBUSxFQUFFO1lBQ1IsTUFBTSxFQUFFLElBQUk7U0FDYjtRQUNELEtBQUssRUFBRSxHQUFHO1FBQ1YsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUU7WUFDUixDQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxFQUFDO1lBQzNELENBQUMsRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBQztZQUNyQyxLQUFLLEVBQUUsRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7U0FDNUM7S0FDRixDQUFDO0lBRUYsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUU7UUFDbkIsT0FBTyxFQUFFLEtBQUs7S0FDZixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztRQUNGLElBQUEsZUFBSSxDQUFRO1FBRW5COztXQUVHO1FBQ0g7WUFDRSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE9BQU87Z0JBQ0wsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsSUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsRUFBRSxRQUFRLElBQUssT0FBQSxDQUFDO29CQUM5QyxDQUFDLEVBQUUsT0FBTztvQkFDVixDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO29CQUNwRCxRQUFRLFVBQUE7aUJBQ1QsQ0FBQyxFQUo2QyxDQUk3QyxDQUFDLENBQUM7Z0JBQ0osU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQyxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxFQUFILENBQUcsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLE9BQU8sQ0FBQztZQUNqQixDQUFDLENBQUM7UUFDSixDQUFDO1FBRUQsSUFBTSxjQUFjLEdBQUcsWUFBWSxFQUFFLENBQUM7UUFFdEMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNqQixRQUFRLEVBQUUsQ0FBQztZQUNYLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7aUJBQy9CLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDeEIsTUFBTSxDQUFDLFVBQUMsQ0FBYyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEVBQWQsQ0FBYyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDeEMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGVtYmVkIGZyb20gJ3ZlZ2EtZW1iZWQnO1xuXG5pbXBvcnQge1RvcExldmVsU3BlY30gZnJvbSAnLi4vLi4vc3JjJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJ1blN0cmVhbWluZ0V4YW1wbGUoZWxlSWQ6IHN0cmluZykge1xuICBjb25zdCB2bFNwZWM6IFRvcExldmVsU3BlYyA9IHtcbiAgICAkc2NoZW1hOiAnaHR0cHM6Ly92ZWdhLmdpdGh1Yi5pby9zY2hlbWEvdmVnYS1saXRlL3YyLmpzb24nLFxuICAgIGRhdGE6IHtuYW1lOiAndGFibGUnfSxcbiAgICBhdXRvc2l6ZToge1xuICAgICAgcmVzaXplOiB0cnVlXG4gICAgfSxcbiAgICB3aWR0aDogNDAwLFxuICAgIG1hcms6ICdsaW5lJyxcbiAgICBlbmNvZGluZzoge1xuICAgICAgeDoge2ZpZWxkOiAneCcsIHR5cGU6ICdxdWFudGl0YXRpdmUnLCBzY2FsZToge3plcm86IGZhbHNlfX0sXG4gICAgICB5OiB7ZmllbGQ6ICd5JywgdHlwZTogJ3F1YW50aXRhdGl2ZSd9LFxuICAgICAgY29sb3I6IHtmaWVsZDogJ2NhdGVnb3J5JywgdHlwZTogJ25vbWluYWwnfVxuICAgIH1cbiAgfTtcblxuICBlbWJlZChlbGVJZCwgdmxTcGVjLCB7XG4gICAgYWN0aW9uczogZmFsc2VcbiAgfSkudGhlbihyZXMgPT4ge1xuICAgIGNvbnN0IHt2aWV3fSA9IHJlcztcblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyBhIG5ldyB0dXBsZSB3aXRoIHJhbmRvbSB3YWxrLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG5ld0dlbmVyYXRvcigpIHtcbiAgICAgIGxldCBjb3VudGVyID0gLTE7XG4gICAgICBsZXQgcHJldmlvdXNZID0gWzUsNSw1LDVdO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY291bnRlcisrO1xuICAgICAgICBjb25zdCBuZXdWYWxzID0gcHJldmlvdXNZLm1hcCgodiwgY2F0ZWdvcnkpID0+ICh7XG4gICAgICAgICAgeDogY291bnRlcixcbiAgICAgICAgICB5OiB2ICsgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMTAgLSBjYXRlZ29yeSAqIDMpLFxuICAgICAgICAgIGNhdGVnb3J5XG4gICAgICAgIH0pKTtcbiAgICAgICAgcHJldmlvdXNZID0gbmV3VmFscy5tYXAoKHYpPT4gdi55KTtcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHM7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlR2VuZXJhdG9yID0gbmV3R2VuZXJhdG9yKCk7XG5cbiAgICBsZXQgbWluaW11bVggPSAtMTAwO1xuICAgIHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBtaW5pbXVtWCsrO1xuICAgICAgY29uc3QgY2hhbmdlU2V0ID0gdmlldy5jaGFuZ2VzZXQoKVxuICAgICAgICAuaW5zZXJ0KHZhbHVlR2VuZXJhdG9yKCkpXG4gICAgICAgIC5yZW1vdmUoKHQ6IHt4OiBudW1iZXJ9KSA9PiB0LnggPCBtaW5pbXVtWCk7XG4gICAgICB2aWV3LmNoYW5nZSgndGFibGUnLCBjaGFuZ2VTZXQpLnJ1bigpO1xuICAgIH0sIDEwMDApO1xuICB9KTtcbn1cbiJdfQ==